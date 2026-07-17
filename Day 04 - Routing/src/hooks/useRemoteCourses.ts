import { useCallback, useEffect, useState } from "react";
import { apiCourseCategories } from "../data/courseExplorer";

export type RemoteCourse = {
  id: number;
  title: string;
  description: string;
  category: string;
};

type ApiPost = {
  id: number;
  title: string;
  body: string;
};

export function useRemoteCourses() {
  const [courses, setCourses] = useState<RemoteCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => setReloadKey((key) => key + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCourses() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=12",
          { signal: controller.signal },
        );

        if (!response.ok) throw new Error("Không thể tải danh sách khóa học");

        const data = (await response.json()) as ApiPost[];
        setCourses(
          data.map((post, index) => ({
            id: post.id,
            title: post.title,
            description: post.body,
            category: apiCourseCategories[index % apiCourseCategories.length],
          })),
        );
      } catch (cause) {
        if (cause instanceof DOMException && cause.name === "AbortError") return;
        setError(cause instanceof Error ? cause.message : "Đã có lỗi xảy ra");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void fetchCourses();
    return () => controller.abort();
  }, [reloadKey]);

  return { courses, isLoading, error, refetch };
}
