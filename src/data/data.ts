// Languages
export const Languages = [
  { value: "zh", label: "Chino (mandarín)" },
  { value: "en", label: "Inglés" },
  { value: "hi", label: "Hindi" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Francés" },
  { value: "ar", label: "Árabe" },
  { value: "bn", label: "Bengalí" },
  { value: "ru", label: "Ruso" },
  { value: "pt", label: "Portugués" },
  { value: "id", label: "Indonesio" },
  { value: "ur", label: "Urdu" },
  { value: "de", label: "Alemán" },
  { value: "ja", label: "Japonés" },
  { value: "sw", label: "Suajili" },
  { value: "ta", label: "Tamil" },
];

export const LanguageLevels = [
  { value: 1, label: "Básico" },
  { value: 2, label: "Intermedio" },
  { value: 3, label: "Avanzado" },
];

export const ExperienceRange = [
  {
    value: "0-1",
    label: "0-1 años",
  },
  {
    value: "1-3",
    label: "1-3 años",
  },
  {
    value: "3-5",
    label: "3-5 años",
  },
  {
    value: "5-10",
    label: "5-10 años",
  },
  {
    value: "10+",
    label: "10+ años",
  },
];

export const YesNo = [
  { value: "true", label: "Sí" },
  { value: "false", label: "No" },
];

export const Age = [
  {
    value: "cualquiera",
    label: "Cualquiera",
  },
];

for (let i = 18; i <= 60; i++) {
  Age.push({
    value: i.toString(),
    label: i.toString(),
  });
}

export const Province = [
  {
    value: "cualquiera",
    label: "Cualquiera",
  },
  {
    value: "Azua",
    label: "Azua",
  },
  {
    value: "Bahoruco",
    label: "Bahoruco",
  },
  {
    value: "Barahona",
    label: "Barahona",
  },
  {
    value: "Dajabón",
    label: "Dajabón",
  },
  {
    value: "Distrito Nacional",
    label: "Distrito Nacional",
  },
  {
    value: "Duarte",
    label: "Duarte",
  },
  {
    value: "Elías Piña",
    label: "Elías Piña",
  },
  {
    value: "El Seibo",
    label: "El Seibo",
  },
  {
    value: "Espaillat",
    label: "Espaillat",
  },
  {
    value: "Hato Mayor",
    label: "Hato Mayor",
  },
  {
    value: "Hermanas Mirabal",
    label: "Hermanas Mirabal",
  },
  {
    value: "Independencia",
    label: "Independencia",
  },
  {
    value: "La Altagracia",
    label: "La Altagracia",
  },
  {
    value: "La Romana",
    label: "La Romana",
  },
  {
    value: "La Vega",
    label: "La Vega",
  },
  {
    value: "María Trinidad Sánchez",
    label: "María Trinidad Sánchez",
  },
  {
    value: "Monseñor Nouel",
    label: "Monseñor Nouel",
  },
  {
    value: "Monte Cristi",
    label: "Monte Cristi",
  },
  {
    value: "Monte Plata",
    label: "Monte Plata",
  },
  {
    value: "Pedernales",
    label: "Pedernales",
  },
  {
    value: "Peravia",
    label: "Peravia",
  },
  {
    value: "Puerto Plata",
    label: "Puerto Plata",
  },
  {
    value: "Samaná",
    label: "Samaná",
  },
  {
    value: "San Cristóbal",
    label: "San Cristóbal",
  },
  {
    value: "San José de Ocoa",
    label: "San José de Ocoa",
  },
  {
    value: "San Juan",
    label: "San Juan",
  },
  {
    value: "San Pedro de Macorís",
    label: "San Pedro de Macorís",
  },
  {
    value: "Sánchez Ramírez",
    label: "Sánchez Ramírez",
  },
  {
    value: "Santiago",
    label: "Santiago",
  },
  {
    value: "Santiago Rodríguez",
    label: "Santiago Rodríguez",
  },
  {
    value: "Santo Domingo",
    label: "Santo Domingo",
  },
  {
    value: "Valverde",
    label: "Valverde",
  },
];
