exports.reset = async() => {

    //REMOVE ALL DATA FOR MODELS WE WANT TO RESET
    let list = [
    {model: "Act"},   
    ]
    await databaseHandler.removeData(list);

    await exports.create();
}

exports.create = async() => {

    let list = [
        {artist: 'Let 3', song: 'Mama ŠČ!', country: 'Croatia'},
        {artist: 'Wild Youth', song: 'We Are One', country: 'Ireland'},
        {artist: 'Sudden Lights', song: 'Aijā', country: 'Latvia'},
        {artist: 'The Busker', song: 'Dance (Our Own Party)', country: 'Malta'},
        {artist: 'Alessandra', song: 'Queen of Kings', country: 'Norway'},
        {artist: 'Mimicat', song: 'Ai coração', country: 'Portugal'},
        {artist: 'Luke Black', song: 'Samo mi se spava (Само ми се спава)', country: 'Serbia'},
        {artist: 'TuralTuranX', song: 'Tell Me More', country: 'Azerbaijan'},
        {artist: 'Vesna', song: "My Sister's Crown", country: 'Czech Republic'},
        {artist: 'Käärijä', song: 'Cha Cha Cha', country: 'Finland'},
        {artist: 'Noa Kirel', song: 'Unicorn', country: 'Israel'},
        {artist: 'Pasha Parfeni', song: 'Soarele și luna', country: 'Moldova'},
        {artist: 'Mia Nicolai and Dion Cooper', song: 'Burning Daylight', country: 'Netherlands'},
        {artist: 'Loreen', song: 'Tattoo', country: 'Sweden'},
        {artist: 'Remo Forrer', song: 'Watergun', country: 'Switzerland'},
        {artist: 'Brunette', song: 'Future Lover', country: 'Armenia'},
        {artist: 'Gustaph', song: 'Because of You', country: 'Belgium'},
        {artist: 'Andrew Lambrou', song: 'Break a Broken Heart', country: 'Cyprus'},
        {artist: 'Reiley', song: 'Breaking My Heart', country: 'Denmark'},
        {artist: 'Alika', song: 'Bridges', country: 'Estonia'},
        {artist: 'Victor Vernicos', song: 'What They Say', country: 'Greece'},
        {artist: 'Diljá', song: 'Power', country: 'Iceland'},
        {artist: 'Theodor Andrei', song: 'D.G.T. (Off and On)', country: 'Romania'},
        {artist: 'Albina & Familja Kelmendi', song: 'Duje', country: 'Albania'},
        {artist: 'Voyager', song: 'Promise', country: 'Australia'},
        {artist: 'Teya and Salena', song: 'Who the Hell Is Edgar?', country: 'Austria'},
        {artist: 'Iru', song: 'Echo', country: 'Georgia'},
        {artist: 'Monika Linkytė', song: 'Stay', country: 'Lithuania'},
        {artist: 'Blanka', song: 'Solo', country: 'Poland'},
        {artist: 'Piqued Jacks', song: 'Like an Animal', country: 'San Marino'},
        {artist: 'Joker Out', song: 'Carpe Diem', country: 'Slovenia'},
        {artist: 'La Zarra', song: 'Évidemment', country: 'France'},
        {artist: 'Lord of the Lost', song: 'Blood & Glitter', country: 'Germany'},
        {artist: 'Marco Mengoni', song: 'Due vite', country: 'Italy'},
        {artist: 'Blanca Paloma', song: 'Eaea', country: 'Spain'},
        {artist: 'Tvorchi', song: 'Heart of Steel', country: 'Ukraine'},
        {artist: 'Mae Muller', song: 'I Wrote a Song', country: 'United Kingdom'},        
    ]

}