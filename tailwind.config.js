/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--main)',
                inactive: '#565656'
            },
            boxShadow: {
                top: '0 0 3px 3px rgba(0, 0, 0, 0.05)'
            }
        }
    },
    plugins: ['prettier-plugin-tailwindcss']
};
