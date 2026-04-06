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

  const uploaded = await Promise.all(files.map((file) => uploadVehicleImage(file)));

  return NextResponse.json({
    ok: true,
    files: uploaded,
  });
}
