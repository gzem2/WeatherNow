const weatherCodeToEmoji = {
    0: "☀️",
    1: "🌤️",
    2: "⛅",
    3: "☁️",
    45: "🌫️",
    48: "🌫️",
    51: "🌦️",
    53: "🌦️",
    55: "🌦️",
    61: "🌧️",
    63: "🌧️",
    65: "🌧️",
    71: "❄️",
    73: "❄️",
    75: "❄️",
    80: "🌦️",
    81: "🌦️",
    82: "🌧️",
    95: "⛈️",
    96: "🌩️",
    99: "🌩️"
};

export default function WeatherIcon({ code, size = "md" }) {
  const emoji = weatherCodeToEmoji[code] || "❓";
  
  const emojiSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <span className={`${emojiSizes[size]} inline-block`}>
      {emoji}
    </span>
  );
}
