import { createFileRoute } from "@tanstack/react-router";
import { getContent, isEditableKey, setContentValue } from "@/lib/edit-content";
import { getEditTokenFromRequest, isSessionValid } from "@/lib/edit-session";

export const Route = createFileRoute("/api/content")({
  server: {
    handlers: {
      GET: async () => {
        const content = await getContent();
        return Response.json(content);
      },
      PUT: async ({ request }) => {
        const token = getEditTokenFromRequest(request);
        if (!(await isSessionValid(token))) {
          return Response.json({ error: "Sessão expirada." }, { status: 401 });
        }

        const body = await request.json().catch(() => null);
        const key = typeof body?.key === "string" ? body.key : "";
        const value = typeof body?.value === "string" ? body.value : "";

        if (!isEditableKey(key)) {
          return Response.json({ error: "Campo inválido." }, { status: 400 });
        }

        const content = await setContentValue(key, value);
        return Response.json(content);
      },
    },
  },
});
