import { NextResponse } from 'next/server';

export async function POST(req) {
    const data = await req.formData();

    let imageUrl;

    if (data.get('image')) {
        await fetch(
            'https://api.imgbb.com/1/upload?key=0df37a745001bed609a0b1e32c599f22',
            {
                method: 'POST',
                body: data
            }
        )
            .then((res) => res.json())
            .then((data) => {
                imageUrl = data.data.image.url;
            });
    }

    return NextResponse.json(imageUrl);
}
