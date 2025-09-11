import React from "react";
import stories from "../utils/stories.json";

interface SearchResult {
  title: string;
  content: string;
  score: number;
}

export default function PoemSearch() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cache, setCache] = React.useState<Record<string, string>>({});

  const allPoems = React.useMemo(() => {
    return Object.keys({ ...stories.data.published, ...stories.data.drafts });
  }, []);

  const loadPoemContent = React.useCallback(
    async (title: string) => {
      if (cache[title]) return cache[title];

      try {
        const response = await fetch(`stories/${title}.txt`);
        if (response.ok) {
          const content = await response.text();
          setCache((prev) => ({ ...prev, [title]: content }));
          return content;
        }
      } catch (e) {
        console.error(`Failed to load ${title}:`, e);
      }
      return "";
    },
    [cache]
  );

  const searchPoems = React.useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      const searchResults: SearchResult[] = [];
      const lowerQuery = searchQuery.toLowerCase();

      for (const title of allPoems) {
        const formattedTitle = title.replaceAll("-", " ");
        const content = await loadPoemContent(title);

        let score = 0;

        // Title match (higher weight)
        if (formattedTitle.toLowerCase().includes(lowerQuery)) {
          score += 10;
        }

        // Content match
        if (content.toLowerCase().includes(lowerQuery)) {
          score += 5;
        }

        // Fuzzy matching for title
        const titleWords = formattedTitle.toLowerCase().split(" ");
        const queryWords = lowerQuery.split(" ");
        for (const qWord of queryWords) {
          for (const tWord of titleWords) {
            if (tWord.startsWith(qWord) || tWord.includes(qWord)) {
              score += 2;
            }
          }
        }

        if (score > 0) {
          searchResults.push({ title, content, score });
        }
      }

      searchResults.sort((a, b) => b.score - a.score);
      setResults(searchResults.slice(0, 5));
      setIsLoading(false);
    },
    [allPoems, loadPoemContent]
  );

  React.useEffect(() => {
    const timeoutId = setTimeout(() => searchPoems(query), 300);
    return () => clearTimeout(timeoutId);
  }, [query, searchPoems]);

  const handleSelect = (title: string) => {
    window.location.hash = title;
    setQuery("");
    setResults([]);
  };

  const padding = "12px 0";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        color: "var(--color-fg)",
        width: "90%",
        maxWidth: "min(400px, 80vw)",
      }}
    >
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search poems..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding,
            color: "var(--color-fg)",
            fontSize: "16px",
            fontFamily: "inherit",
            border: "2px solid var(--color-hl)",
            borderRadius: "10px",
            outline: "none",
            textAlign: "center",
            backgroundColor: "var(--color-bg)",
            backdropFilter: "blur(10px)",
          }}
        />

        {(results.length > 0 || isLoading) && (
          <div
            style={{
              position: "absolute",
              bottom: "110%",
              left: 0,
              right: 0,
              backgroundColor: "var(--color-bg)",
              backdropFilter: "blur(10px)",
              border: "2px solid var(--color-hl)",
              borderBottom: "none",
              borderRadius: "10px",
              padding,
              width: "100%",
              overflowY: "auto",
            }}
          >
            {isLoading && (
              <div style={{ padding, color: "var(--color-fg)" }}>
                Searching...
              </div>
            )}

            {results.slice(0, 3).map((result) => (
              <div
                key={result.title}
                onClick={() => handleSelect(result.title)}
                style={{
                  padding,
                  cursor: "pointer",
                  borderRadius: "10px",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "4px",
                    textTransform: "capitalize",
                  }}
                >
                  {result.title.replaceAll("-", " ")}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {result.content.split("\n")[0]}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
