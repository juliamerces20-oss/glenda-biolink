import { createFileRoute } from "@tanstack/react-router";
import { put } from "@vercel/blob";
import { getEditTokenFromRequest, isSessionValid } from "@/lib/edit-session";

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export const Route = createFileRoute("/api/upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = getEditTokenFromRequest(request);
        if (!(await isSessionValid(token))) {
          return Response.json({ error: "Sessão expirada." }, { status: 401 });
        }

        const formData = await request.formData().catch(() => null);
        const file = formData?.get("file");

        if (!(file instanceof File)) {
          return Response.json(
            { error: "Arquivo não enviado." },
            { status: 400 },
          );
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
          return Response.json(
            { error: "Formato de imagem não suportado." },
            { status: 400 },
          );
        }

        if (file.size > MAX_FILE_SIZE_BYTES) {
          return Response.json(
            { error: "Imagem muito grande." },
            { status: 400 },
          );
        }

        const blob = await put(
          `biolink/${crypto.randomUUID()}-${file.name}`,
          file,
          {
            access: "public",
            addRandomSuffix: false,
          },
        );

        return Response.json({ url: blob.url });
      },
    },
  },
});
