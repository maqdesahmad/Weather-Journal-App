/* متغيرات عامة */

// تكوين رابط API وتضمين المفتاح الخاص
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const weatherApiKey = 'b6e08f447db5ff7981b4e79c6144e3bc';

// دالة للحصول على بيانات الطقس من API
const fetchWeatherData = async (zipCode) => {
    try {
        const response = await fetch(`${weatherApiUrl}${zipCode}&appid=${weatherApiKey}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('حدث خطأ أثناء جلب بيانات الطقس:', error);
    }
};

// دالة لإرسال بيانات إلى الخادم باستخدام POST
const postToServer = async (url = '', data = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('حدث خطأ أثناء إرسال البيانات إلى الخادم:', error);
    }
};

// دالة لتحديث واجهة المستخدم بآخر البيانات
const updateInterface = async () => {
    try {
        const response = await fetch('/all');
        const allData = await response.json();
        document.getElementById('date').textContent = `Date: ${allData.date}`;
        document.getElementById('temp').textContent = `Temperature: ${allData.temperature}°F`;
        document.getElementById('content').textContent = `Feeling: ${allData.userResponse}`;
    } catch (error) {
        console.error('حدث خطأ أثناء تحديث واجهة المستخدم:', error);
    }
};

// مستمع لحدث الضغط على زر التوليد
document.getElementById('generate').addEventListener('click', () => {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    fetchWeatherData(zipCode)
        .then((weatherData) => {
            const currentDate = new Date().toLocaleDateString();
            return postToServer('/add', { temperature: weatherData.main.temp, date: currentDate, userResponse: feelings });
        })
        .then(() => {
            updateInterface();
        });
});
