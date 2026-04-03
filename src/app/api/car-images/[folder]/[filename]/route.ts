import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

const ROOT = path.join(process.cwd(), "src", "arabalar");

function getContentType(filename: string) {
  if (filename.endsWith(".png")) return "image/png";
  if (filename.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

type RouteContext = {
  params: Promise<{
    folder: string;
    filename: string;
  }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { folder, filename } = await context.params;
  const safePath = path.normalize(path.join(ROOT, folder, filename));

  if (!safePath.startsWith(ROOT)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const file = await readFile(safePath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": getContentType(filename.toLowerCase()),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
