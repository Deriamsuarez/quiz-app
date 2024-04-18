import hello_aud from '@/assets/audios/hello.mp3'
import hi_aud from '@/assets/audios/hi.mp3'
import excuse_me_aud from '@/assets/audios/excuse_me.mp3'
import how_much_is_it_aud from '@/assets/audios/how_much_is_it.mp3'

// Opcion multiple

const options = [
    {
        id: 1,
        question: "¿De qué color es el cielo?",
        answers: [
            {id: 1, value: "blue", correctAnswer: true },
            {id: 2, value: "yellow", correctAnswer: false },
            {id: 3, value: "red", correctAnswer: false },
            {id: 4, value: "rose", correctAnswer: false },

        ],
    },
    {
        id: 2,
        question: "¿Cómo se traduce edad?",
        answers: [
            {id: 1, value: "bird", correctAnswer: false },
            {id: 2, value: "age", correctAnswer: true },
            {id: 3, value: "year", correctAnswer: false },
            {id: 4, value: "blue", correctAnswer: true },

        ],
    },
    {
        id: 3,
        question: "¿Cuál es la capital de Francia?",
        answers: [
            {id: 1, value: "Madrid", correctAnswer: false },
            {id: 2, value: "Roma", correctAnswer: false },
            {id: 3, value: "París", correctAnswer: true },
            {id: 4, value: "Londres", correctAnswer: false },
        ],
    },
    {
        id: 4,
        question: "¿Cuántos lados tiene un cuadrado?",
        answers: [
            {id: 1, value: "Cuatro", correctAnswer: true },
            {id: 2, value: "Cinco", correctAnswer: false },
            {id: 3, value: "Seis", correctAnswer: false },
            {id: 4, value: "Tres", correctAnswer: false },
        ],
    },
];

// Relaciona las columnas

const words = [
    { id: "item-01", text: "Gato", translation: "Cat" },
    { id: "item-02", text: "Perro", translation: "Dog" },
    { id: "item-03", text: "Casa", translation: "House" },
    { id: "item-04", text: "Árbol", translation: "Tree" },
    { id: "item-05", text: "Ratón", translation: "Mouse" },
    { id: "item-06", text: "Pájaro", translation: "Bird" },
    { id: "item-07", text: "Coche", translation: "Car" },
    { id: "item-08", text: "Planta", translation: "Plant" },
    { id: "item-09", text: "Silla", translation: "Chair" },
    { id: "item-10", text: "Mesa", translation: "Table" },
    { id: "item-11", text: "Ventana", translation: "Window" },
    { id: "item-12", text: "Lámpara", translation: "Lamp" },
    { id: "item-13", text: "Computadora", translation: "Computer" },
    { id: "item-14", text: "Televisor", translation: "Television" },
    { id: "item-15", text: "Teléfono", translation: "Phone" },
    { id: "item-16", text: "Cama", translation: "Bed" },
    { id: "item-17", text: "Reloj", translation: "Clock" },
    { id: "item-18", text: "Espejo", translation: "Mirror" },
    { id: "item-19", text: "Refrigerador", translation: "Refrigerator" },
    { id: "item-20", text: "Estufa", translation: "Stove" },
    { id: "item-21", text: "Escritorio", translation: "Desk" },
    { id: "item-22", text: "Sofá", translation: "Sofa" },
    { id: "item-23", text: "Mesa de café", translation: "Coffee table" },
    { id: "item-24", text: "Silla de comedor", translation: "Dining chair" }
  ];

// Ordena la oración

const phrases = [
    "The quick brown fox jumps over the lazy dog.",
    "A watched pot never boils.",
    "Actions speak louder than words.",
    "Beauty is in the eye of the beholder.",
    "Birds of a feather flock together.",
    "Cleanliness is next to godliness.",
    "Don't count your chickens before they hatch.",
    "Early to bed and early to rise, makes a man healthy, wealthy, and wise.",
    "Every cloud has a silver lining.",
    "Fortune favors the bold.",
    "Honesty is the best policy.",
    "In for a penny, in for a pound.",
    "It's a piece of cake.",
    "Keep your friends close and your enemies closer.",
    "Let sleeping dogs lie.",
    "Money doesn't grow on trees.",
    "No pain, no gain.",
    "Out of sight, out of mind.",
    "Practice makes perfect.",
    "The early bird catches the worm."
]

// Escucha y escribe

const wordsListen = [
    { id: 1, value: "hello", url: hello_aud },
    { id: 2, value: "hi", url: hi_aud },
    { id: 3, value: "Excuse me", url: excuse_me_aud },
    { id: 4, value: "How mouch is it", url: how_much_is_it_aud },
]


export {
    options,
    words,
    phrases,
    wordsListen
}