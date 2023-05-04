interface SolidBG {
    style: 'solid',
    colour: string[],
    rectHeight: number[]
}

interface GradientBG {
    style: 'gradient',
    angle: number,
    colour: string[],
    position: number[]
}

interface Theme {
    name: string
    icon: string
    background: SolidBG | GradientBG
    foreground: string
}

interface ThemeGroup {
    label: string
    themes: Theme[]
}

export default <ThemeGroup[]>[
    {
        label: 'Pride Flags',
        themes: [
            {
                name: 'LGBT Pride',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Gay_Pride_Flag.svg',
                background: {
                    style: 'solid',
                    colour: ['#770088', '#004CFF', '#028121', '#FFEE00', '#FF8D00', '#E50000'],
                    rectHeight: [1, 5/6, 4/6, 3/6, 2/6, 1/6]
                },
                foreground: '#FFFFFF'
            },
            {
                name: 'Bisexual',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Bisexual_Pride_Flag.svg',
                background: {
                    style: 'solid',
                    colour: ['#0038A8', '#9B4F96', '#D60270'],
                    rectHeight: [1, 3/5, 2/5]
                },
                foreground: '#FFFFFF'
            }
        ]
    },
    {
        label: 'Sport Clubs',
        themes: [
            {
                name: 'Galatasaray',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Galatasaray_Sports_Club_Logo.svg',
                background: {
                    style: 'solid',
                    colour: ['#B81B3F'],
                    rectHeight: [1]
                },
                foreground: '#F3AB17'
            },
            {
                name: 'Fenerbahçe',
                icon: 'https://upload.wikimedia.org/wikipedia/en/3/39/Fenerbahçe.svg',
                background: {
                    style: 'solid',
                    colour: ['#163962'],
                    rectHeight: [1]
                },
                foreground: '#FFED00'
            },
            {
                name: 'Beşiktaş',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/d/da/BesiktasJK-Logo.svg',
                background: {
                    style: 'solid',
                    colour: ['#000000'],
                    rectHeight: [1]
                },
                foreground: '#FFFFFF'
            }
        ]
    },
    {
        label: 'Social Apps',
        themes: [
            {
                name: 'Discord',
                icon: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg',
                background: {
                    style: 'solid',
                    colour: ['#5865F2'],
                    rectHeight: [1]
                },
                foreground: '#FFFFFF'
            },
            {
                name: 'Twitter',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg',
                background: {
                    style: 'solid',
                    colour: ['#1D9BF0'],
                    rectHeight: [1]
                },
                foreground: '#FFFFFF'
            },
            /*{
                name: 'Instagram',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg',
                background: {
                    style: 'gradient',
                    angle: 196.7,
                    colour: ['#B900B4', '#F50000', '#FFD521'],
                    position: [65.84, 97.69, 115.14]
                },
                foreground: '#FFFFFF'
            },*/
            {
                name: 'WhatsApp',
                icon: 'https://static.whatsapp.net/rsrc.php/v3/yz/r/ujTY9i_Jhs1.png',
                background: {
                    style: 'solid',
                    colour: ['#25D366'],
                    rectHeight: [1]
                },
                foreground: '#FFFFFF'
            }
        ]
    }
]