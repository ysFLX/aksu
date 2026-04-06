import { NextResponse } from "next/server";

import { uploadVehicleImage } from "@/lib/inventory/manual";

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll("files").filter((entry): entry is File => entry instanceof File);

  if (!files.length) {
    return NextResponse.json(
      {
        ok: false,
        message: "Dosya bulunamadi.",
      },
      { status: 400 },
    );
  }

  const oversizedFile = files.find((file) => file.size > 4 * 1024 * 1024);

  if (oversizedFile) {
    return NextResponse.json(
      {
        ok: false,
        message: `${oversizedFile.name} cok buyuk. Dosya basina en fazla 4 MB yukleyebilirsin.`,
      },
      { status: 413 },
    );
  }

  try {
    const uploaded = await Promise.all(files.map((file) => uploadVehicleImage(file)));

    return NextResponse.json({
      ok: true,
      files: uploaded,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Gorseller yuklenemedi.",
      },
      { status: 500 },
    );
  }
}
