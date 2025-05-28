document.addEventListener('DOMContentLoaded', function() {
    // Mendapatkan elemen-elemen DOM
    const inputSuhu = document.getElementById('input-suhu');
    const hasilSuhu = document.getElementById('hasil-suhu');
    const detailSuhu = document.getElementById('detail-suhu');

    const tombolKonversi = document.getElementById('tombol-konversi');
    const tombolReset = document.getElementById('tombol-reset');
    const tombolReverse = document.getElementById('tombol-reverse');

    const inputLabel = document.getElementById('input-label');
    const hasilLabel = document.getElementById('hasil-label');
    // Mengambil elemen p dari section pertama untuk intro
    const mainIntroTextElement = document.querySelector('main.container-konversi section:first-of-type p');


    const caraKonversiHeader = document.getElementById('cara-konversi-header');
    const caraKonversiIntro = document.getElementById('cara-konversi-intro');
    const rumusUtama = document.getElementById('rumus-utama');
    // const rumusAlternatif = document.getElementById('rumus-alternative'); // Jika Anda ingin menggunakan ini

    // State untuk mode konversi: true = Celcius ke Fahrenheit, false = Fahrenheit ke Celcius
    let isCelciusToFahrenheitMode = true;

    // --- LOGIKA KONVERSI SUHU ---
    /**
     * Mengkonversi suhu dari Celsius ke Fahrenheit.
     * @param {number} celsius - Suhu dalam Celsius.
     * @returns {number} Suhu dalam Fahrenheit.
     * @throws {Error} Jika input bukan angka.
     */
    function celsiusToFahrenheit(celsius) {
        if (typeof celsius !== 'number') {
            throw new Error('Input untuk konversi Celsius ke Fahrenheit harus berupa angka.');
        }
        return (celsius * 9/5) + 32;
    }

    /**
     * Mengkonversi suhu dari Fahrenheit ke Celsius.
     * @param {number} fahrenheit - Suhu dalam Fahrenheit.
     * @returns {number} Suhu dalam Celsius.
     * @throws {Error} Jika input bukan angka.
     */
    function fahrenheitToCelsius(fahrenheit) {
        if (typeof fahrenheit !== 'number') {
            throw new Error('Input untuk konversi Fahrenheit ke Celsius harus berupa angka.');
        }
        return (fahrenheit - 32) * 5/9;
    }
    // --- AKHIR LOGIKA KONVERSI SUHU ---


    // Fungsi untuk memperbarui UI berdasarkan mode konversi
    function updateUIForMode() {
        handleReset(); // Bersihkan input/output saat mode berubah
        if (isCelciusToFahrenheitMode) {
            inputLabel.innerHTML = 'Celcius (°C):';
            hasilLabel.innerHTML = 'Fahrenheit (°F):';
            inputSuhu.placeholder = 'Contoh: 25';
            if (mainIntroTextElement) {
            mainIntroTextElement.innerHTML = 'Masukkan suhu derajat Celcius (°C) ke kotak dibawah ini, lalu klik tombol Konversi<br>untuk mendapatkan hasil konversi dalam bentuk Fahrenheit (°F).';
            }

            caraKonversiHeader.textContent = 'Cara Konversi Celcius (°C) ke Fahrenheit (°F):';
            caraKonversiIntro.textContent = 'Untuk mengkonversi suhu dari Celcius (°C) ke Fahrenheit (°F), gunakan rumus berikut:';
            rumusUtama.innerHTML = 'S<sub>(°F)</sub> = (S<sub>(°C)</sub> * 9/5) + 32';
        } else {
            inputLabel.innerHTML = 'Fahrenheit (°F):';
            hasilLabel.innerHTML = 'Celcius (°C):';
            inputSuhu.placeholder = 'Contoh: 77';
            if (mainIntroTextElement) {
                mainIntroTextElement.innerHTML = 'Masukkan suhu derajat Fahrenheit (°F) ke kotak dibawah ini, lalu klik tombol Konversi<br>untuk mendapatkan hasil konversi dalam bentuk Celcius (°C).';
            }

            caraKonversiHeader.textContent = 'Cara Konversi Fahrenheit (°F) ke Celcius (°C):';
            caraKonversiIntro.textContent = 'Untuk mengkonversi suhu dari Fahrenheit (°F) ke Celcius (°C), gunakan rumus berikut:';
            rumusUtama.innerHTML = 'S<sub>(°C)</sub> = (S<sub>(°F)</sub> - 32) * 5/9';
        }
    }

    // Fungsi untuk menangani konversi suhu
    function handleKonversi() {
        const inputValueString = inputSuhu.value.trim();
        if (inputValueString === "") {
            hasilSuhu.value = "";
            detailSuhu.value = "Input suhu tidak boleh kosong.";
            inputSuhu.focus();
            return;
        }

        const inputValue = parseFloat(inputValueString);
        if (isNaN(inputValue)) {
            hasilSuhu.value = "";
            detailSuhu.value = "Input tidak valid. Harap masukkan angka.";
            inputSuhu.focus();
            return;
        }

        let result;
        let calculationSteps;
        const inputUnit = isCelciusToFahrenheitMode ? "°C" : "°F";
        const outputUnit = isCelciusToFahrenheitMode ? "°F" : "°C";

        try {
            if (isCelciusToFahrenheitMode) { // Celcius ke Fahrenheit
                result = celsiusToFahrenheit(inputValue);
                calculationSteps = `(${inputValue}${inputUnit} \u00D7 9/5) + 32 = ${result.toFixed(2)}${outputUnit}`;
            } else { // Fahrenheit ke Celcius
                result = fahrenheitToCelsius(inputValue);
                calculationSteps = `(${inputValue}${inputUnit} - 32) \u00D7 5/9 = ${result.toFixed(2)}${outputUnit}`;
            }
            hasilSuhu.value = result.toFixed(2);
            detailSuhu.value = calculationSteps;
        } catch (error) {
            hasilSuhu.value = "";
            detailSuhu.value = "Error: " + error.message;
            console.error("Error konversi:", error);
        }
    }

    // Fungsi untuk mereset input dan output
    function handleReset() {
        inputSuhu.value = '';
        hasilSuhu.value = '';
        detailSuhu.value = '';
        inputSuhu.focus();
    }

    // Event listener untuk tombol
    if (tombolKonversi) {
        tombolKonversi.addEventListener('click', handleKonversi);
    }
    if (tombolReset) {
        tombolReset.addEventListener('click', handleReset);
    }
    if (tombolReverse) {
        tombolReverse.addEventListener('click', function() {
            isCelciusToFahrenheitMode = !isCelciusToFahrenheitMode; // Toggle mode
            updateUIForMode();
        });
    }

    // Panggil updateUIForMode sekali di awal untuk memastikan UI sesuai dengan mode default
    updateUIForMode();
});