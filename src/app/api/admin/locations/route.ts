import { NextResponse } from "next/server";

type ProvinceResponse = {
  data?: Array<{
    name: string;
    districts?: Array<{ name: string }>;
  }>;
};

export async function GET() {
  try {
    const response = await fetch("https://turkiyeapi.dev/api/v1/provinces", {
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      throw new Error(`Locations fetch failed with ${response.status}`);
    }

    const json = (await response.json()) as ProvinceResponse;
    const provinces = (json.data ?? []).map((province) => ({
      name: province.name,
      districts: (province.districts ?? []).map((district) => district.name).sort((a, b) => a.localeCompare(b, "tr")),
    }));

    return NextResponse.json({ provinces });
  } catch (error) {
    return NextResponse.json(
      {
        provinces: [],
        message: error instanceof Error ? error.message : "Locations could not be loaded.",
      },
      { status: 500 },
    );
  }
}
