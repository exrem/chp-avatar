export default (language: string): {
    title: string,
    selectATheme: string,
    selectAnAnimeCharacter: string,
    result: string,
    download: string
} => {
    return {
        az: {
            title: 'CHP Avatar Hazırlayıcı',
            selectATheme: 'Bir mövzu seçin:',
            selectAnAnimeCharacter: 'Bir anime obrazı seçin:',
            result: 'Nəticə:',
            download: 'Yükləyin'
        },
        de: {
            title: 'CHP Avatar Generator',
            selectATheme: 'Wähle ein Thema:',
            selectAnAnimeCharacter: 'Wählen Sie einen Anime-Charakter aus:',
            result: 'Ergebnis:',
            download: 'Herunterladen'
        },
        fr: {
            title: 'Générateur d\'avatars CHP',
            selectATheme: 'Sélectionnez un thème:',
            selectAnAnimeCharacter: 'Sélectionnez un personnage d\'anime:',
            result: 'Résultat',
            download: 'Télécharger'
        },
        tr: {
            title: 'CHP Avatar Üretici',
            selectATheme: 'Bir tema seçin:',
            selectAnAnimeCharacter: 'Bir anime karakteri seçin:',
            result: 'Sonuç:',
            download: 'İndirin'
        }
    } [language] ?? {
        title: 'CHP Avatar Generator',
        selectATheme: 'Select a theme:',
        selectAnAnimeCharacter: 'Select an anime character:',
        result: 'Result:',
        download: 'Download'
    }
}