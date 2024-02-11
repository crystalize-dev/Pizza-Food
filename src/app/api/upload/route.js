// noinspection JSCheckFunctionSignatures

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
    const data = await req.formData();
    const API =
        'https://api.imgbb.com/1/upload?key=0df37a745001bed609a0b1e32c599f22';
    let Response;

    if (data.get('image')) {
        await axios
            .post(API, data)
            .then((res) => {
                if (res.status === 200) {
                    Response = NextResponse.json(res.data.data.url, {
                        status: 200
                    });
                } else {
                    Response = NextResponse.json(
                        { message: 'Something went wrong!' },
                        { status: res.status }
                    );
                }
            })
            .catch((err) => {
                Response = NextResponse.json({ error: err }, { status: 400 });
            });
    } else {
        Response = NextResponse.json(
            { error: 'No images proviede!' },
            { status: 400 }
        );
    }

    return Response;
}
