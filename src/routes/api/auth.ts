import { createFileRoute } from "@tanstack/react-router";
import { createSessionToken } from "@/lib/edit-session";

export const Route = createFileRoute("/api/auth")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => null);
        const password =
          typeof body?.password === "string" ? body.password : "";

        if (
          !process.env.EDIT_PASSWORD ||
          password !== process.env.EDIT_PASSWORD
        ) {
          return Response.json({ error: "Senha incorreta." }, { status: 401 });
        }

        const token = await createSessionToken();
        return Response.json({ token });
      },
    },
  },
});
