import React from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

const ImageUpload = ({ image, onChange, fetching, setFetching }) => {
    const handleImageChange = async (e) => {
        const files = e.target.files;

        const data = new FormData();

        data.set('image', files[0]);

        setFetching(true);
        const promise = fetch('/api/upload', {
            method: 'POST',
            body: data
        })
            .then((res) => {
                return res.json();
            })
            .then((link) => {
                if (link) {
                    onChange && onChange(link);
                }
            });

        setFetching(false);

        await toast.promise(promise, {
            loading: 'Loading...',
            success: 'Uploaded, now you can save it!',
            error: 'Some error occurred!'
        });
    };

    return (
        <div className="flex w-full flex-col items-center rounded-lg md:w-fit">
            <div className="relative h-36 w-32">
                {image && (
                    <Image
                        className="mb-2 rounded-lg border border-solid border-black/50 object-bottom"
                        src={image}
                        alt="logo"
                        priority={true}
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
            </div>

            <label className={'w-full'}>
                <input
                    disabled={fetching}
                    accept="image/*"
                    multiple={false}
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                />
                <span
                    className={`mx-auto mt-2 block w-44 cursor-pointer rounded-lg border p-2 text-center transition-all hover:bg-black hover:text-white md:w-full ${
                        fetching &&
                        'cursor-not-allowed bg-gray-300 text-white hover:bg-gray-300'
                    }`}
                >
                    Edit
                </span>
            </label>
        </div>
    );
};

export default ImageUpload;
