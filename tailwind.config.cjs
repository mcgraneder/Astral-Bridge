const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['PlusJakartaSans', ...defaultTheme.fontFamily.sans]
            },
            animation: {
                blink: 'pusle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                widthi: 'widthin 1s forwards',
                widtho: 'widthout 1s backwards'
            },
            keyframes: {
                pusle: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' }
                },
                widthin: {
                    '0%': { left: '150%' },
                    '100%': { left: '0%' }
                },
                widthout: {
                    '0%': { left: '0%' },
                    '100%': { left: '150%' }
                }
            },
            transitionProperty: {
                width: 'width'
            },
            colors: {
                tertiary: 'rgb(60, 65, 80)',
                secondary: 'rgb(36,39,54)',
                lightTertiary: 'rgb(66, 87, 122)',
                darkBackground: 'rgb(13, 17, 28)',
                hoverLightground: 'rgb(20, 24, 35)',

                extraDarkBackground: 'rgb(13, 17, 28)',
                secondaryButtonColor: 'rgb(28,44,81)',
                backgroundSecondaryLight: 'rgb(74, 107, 161)',
                homeButton: 'rgb(105, 95, 215)'
            },
            spacing: {
                '630px': '630px',
                '550px': '550px'
            },
            boxShadow: {
                custom: '0 0px 15px rgba(0, 0, 0, 0.01)'
            },

            backgroundImage: {
                // 'section4-part1':
                //     'radial-gradient(555.04% 280.25% at 0% 0%, theme("colors.black-700") 31.88%, theme("colors.primary") 100%)',
                // 'section4-part2':
                //     'radial-gradient(555.04% 280.25% at 100% 0%, theme("colors.black-700") 31.88%, theme("colors.primary") 100%)',
                'section4-part3-web': 'url("/svgs/section4-part3-web.svg")',
                'section4-part3-tablet':
                    'radial-gradient(100.69% 1520.93% at 50% 50%, #00000000 44.73%, theme("colors.darkBackground") 100%), url("/svgs/section4-part3-tablet.svg")',
                'section4-part3-mobile':
                    'radial-gradient(100.69% 1520.93% at 50% 50%, #00000000 44.73%, theme("colors.darkBackground") 100%), url("/svgs/section4-part3-mobile.svg")'
            },
            screens: {
                sm2: '600px',
                md2: '760px',
                md: '900px',
                xs: '400px',
                mlg1: '1170px',
                mlg: '1250px'
            },
            borderRadius: {
                '32px': '32px'
            }
        }
    },
    safelist: ['bg-warning', 'bg-error', 'text-warning', 'text-error'],
    plugins: []
};
