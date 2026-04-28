// Password Protection System
(function() {
    const CORRECT_PASSWORD = "dounia";
    const REDIRECT_URL = "https://www.instagram.com/sefiane.20/";
    const MAX_ATTEMPTS = 3;
    
    const overlay = document.getElementById('passwordOverlay');
    const passwordInput = document.getElementById('passwordInput');
    const togglePassword = document.getElementById('togglePassword');
    const submitBtn = document.getElementById('passwordSubmit');
    const errorMsg = document.getElementById('passwordError');
    
    let attempts = 0;
    
    // Lock body
    document.body.classList.add('locked');
    
    // Check if already authenticated
    if (sessionStorage.getItem('authenticated') === 'true') {
        overlay.classList.add('hidden');
        document.body.classList.remove('locked');
        return;
    }
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
    });
    
    // Submit password
    function checkPassword() {
        const enteredPassword = passwordInput.value;
        
        if (!enteredPassword) {
            passwordInput.classList.add('error');
            setTimeout(() => passwordInput.classList.remove('error'), 500);
            return;
        }
        
        if (enteredPassword === CORRECT_PASSWORD) {
            // Success
            sessionStorage.setItem('authenticated', 'true');
            overlay.style.animation = 'fadeIn 0.5s ease reverse';
            setTimeout(() => {
                overlay.classList.add('hidden');
                document.body.classList.remove('locked');
            }, 500);
        } else {
            // Failed
            attempts++;
            passwordInput.classList.add('error');
            errorMsg.classList.add('show');
            
            if (attempts >= MAX_ATTEMPTS) {
                errorMsg.textContent = "Too many failed attempts! Redirecting to Instagram...";
                setTimeout(() => {
                    window.location.href = REDIRECT_URL;
                }, 2000);
            } else {
                errorMsg.textContent = `Incorrect password! (${MAX_ATTEMPTS - attempts} attempts remaining)`;
                passwordInput.value = '';
                setTimeout(() => {
                    passwordInput.classList.remove('error');
                }, 500);
            }
        }
    }
    
    submitBtn.addEventListener('click', checkPassword);
    
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    
    // Focus input on load
    setTimeout(() => passwordInput.focus(), 500);
})();

document.getElementById('aobToByte').addEventListener('click', function() {
    const inputField = document.getElementById('inputField');
    const outputField = document.getElementById('outputField');
    const devInfo = document.querySelector('.dev-info');

    if (inputField.value === "") {
        devInfo.textContent = "No codes to convert";
        devInfo.classList.add('shake');
        setTimeout(() => devInfo.classList.remove('shake'), 500);
        return;
    }

    let text = inputField.value.trim();
    let array = text.split(/\s+/).filter(Boolean);
    let list = [];
    let flag = false;

    array = array.map(item => item.toUpperCase());

    for (let item of array) {
        if (item.startsWith("0X") || item === "?" || item === "'?'") {
            flag = true;
            break;
        }
    }

    if (flag) {
        devInfo.textContent = "This text is already in BYTE format.";
        devInfo.classList.add('shake');
        setTimeout(() => devInfo.classList.remove('shake'), 500);
        return;
    }
    for (let item of array) {
        if (item === "??" || item === "?") {
            list.push("'?'");
        } else {
            list.push("0x" + item);
        }
    }

    let result = list.join(", ");
    outputField.value = result;
    devInfo.textContent = "Text converted from AOB to BYTE successfully.";
    devInfo.classList.add('pulse');
    setTimeout(() => devInfo.classList.remove('pulse'), 1500);
});

document.getElementById('clearAll').addEventListener('click', function() {
    const inputField = document.getElementById('inputField');
    const outputField = document.getElementById('outputField');
    const devInfo = document.querySelector('.dev-info');
    inputField.value = "";
    outputField.value = "";
    devInfo.textContent = "SEFIANE CHEAT";
});

document.getElementById('byteToAob').addEventListener('click', function() {
    const inputField = document.getElementById('inputField');
    const outputField = document.getElementById('outputField');
    const devInfo = document.querySelector('.dev-info');

    if (inputField.value === "") {
        devInfo.textContent = "No codes to convert";
        devInfo.classList.add('shake');
        setTimeout(() => devInfo.classList.remove('shake'), 500);
        return;
    }

    let text = inputField.value.trim();
    let array = text.split(/[,\s]+/).filter(Boolean);
    let result = "";

    for (let item of array) {
        if (item === "'?'") {
            result += "?? ";
        } else {
            let str = item.replace(/^0x/i, "");
            result += str + " ";
        }
    }

    let aobText = result.trim();

    if (aobText === text) {
        devInfo.textContent = "This text is already in AOB format.";
        devInfo.classList.add('shake');
        setTimeout(() => devInfo.classList.remove('shake'), 500);
        return;
    }
    outputField.value = aobText;
    devInfo.textContent = "Text converted from BYTE to AOB successfully.";
    devInfo.classList.add('pulse');
    setTimeout(() => devInfo.classList.remove('pulse'), 1500);
});

document.getElementById('outputIconButton3').addEventListener('click', function() {
    const outputField = document.getElementById('outputField');
    const devInfo = document.querySelector('.dev-info');

    if (outputField.value === "") {
        devInfo.textContent = "Nothing to copy";
        devInfo.classList.add('shake');
        setTimeout(() => devInfo.classList.remove('shake'), 500);
        return;
    }

    navigator.clipboard.writeText(outputField.value)
        .then(() => {
            devInfo.textContent = "Text copied to clipboard";
            devInfo.classList.add('pulse');
            setTimeout(() => devInfo.classList.remove('pulse'), 1500);
        })
        .catch(() => {
            devInfo.textContent = "Failed to copy";
            devInfo.classList.add('shake');
            setTimeout(() => devInfo.classList.remove('shake'), 500);
        });
});

document.getElementById('outputIconButton4').addEventListener('click', function() {
    const outputField = document.getElementById('outputField');
    const devInfo = document.querySelector('.dev-info');
    outputField.value = "";
    devInfo.textContent = "SEFIANE CHEAT";
});

document.getElementById('inputIconButton2').addEventListener('click', function() {
    const inputField = document.getElementById('inputField');
    const devInfo = document.querySelector('.dev-info');
    inputField.value = "";
    devInfo.textContent = "SEFIANE CHEAT";
});

document.getElementById("inputIconButton1").addEventListener("click", function() {
    const devInfo = document.querySelector('.dev-info');
    navigator.clipboard.readText().then(text => {
        if (text) {
            document.getElementById("inputField").value = text;
            devInfo.textContent = "Text pasted successfully";
            devInfo.classList.add('pulse');
            setTimeout(() => devInfo.classList.remove('pulse'), 1500);
        } else {
            devInfo.textContent = "Clipboard is empty";
            devInfo.classList.add('shake');
            setTimeout(() => devInfo.classList.remove('shake'), 500);
        }
    }).catch(() => {
        devInfo.textContent = "Failed to read clipboard";
        devInfo.classList.add('shake');
        setTimeout(() => devInfo.classList.remove('shake'), 500);
    });
});

// Image Converter
const dropArea = document.getElementById('dropArea');
const imageInput = document.getElementById('imageInput');
const addImageButton = document.getElementById('addImageButton');
const clearImageButton = document.getElementById('clearImageButton');
const convertImageButton = document.getElementById('convertImageButton');
const imagePreview = document.getElementById('imagePreview');
const imageInfo = document.getElementById('imageInfo');
const imageResult = document.getElementById('imageResult');
const imageActions = document.getElementById('imageActions');
const copyImageButton = document.getElementById('copyImageButton');
const downloadImageButton = document.getElementById('downloadImageButton');

let selectedImage = null;
let imageByteArray = null;

addImageButton.addEventListener('click', () => {
    imageInput.click();
});

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    handleImage(file);
});

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('dragover');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('dragover');
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('dragover');
    const file = event.dataTransfer.files[0];
    handleImage(file);
});

function handleImage(file) {
    if (file && file.type.startsWith('image/')) {
        selectedImage = file;

        // Show preview
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);

        // Show file info
        imageInfo.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        imageInfo.style.display = 'block';

        // Hide previous results
        imageResult.style.display = 'none';
        imageActions.style.display = 'none';
    } else {
        alert("Please select a valid image file.");
    }
}

clearImageButton.addEventListener('click', () => {
    selectedImage = null;
    imageInput.value = "";
    imagePreview.style.display = 'none';
    imageInfo.style.display = 'none';
    imageResult.style.display = 'none';
    imageActions.style.display = 'none';
});

convertImageButton.addEventListener('click', () => {
    if (!selectedImage) {
        alert("Please upload an image first.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const array = new Uint8Array(e.target.result);
        imageByteArray = array;

        // Create byte array text
        let byteText = "";
        for (let i = 0; i < array.length; i++) {
            byteText += `0x${array[i].toString(16).padStart(2, '0')}`;
            if (i < array.length - 1) {
                byteText += `, `;
                if ((i + 1) % 16 === 0) byteText += `\n`;
            }
        }

        // Create full content
        let fullContent = `byte[] imageBytes = {\n${byteText}\n};`;

        // Display result
        imageResult.textContent = fullContent;
        imageResult.style.display = 'block';
        imageActions.style.display = 'flex';
    };

    reader.onerror = function() {
        alert("Error reading the image.");
    };

    reader.readAsArrayBuffer(selectedImage);
});

copyImageButton.addEventListener('click', () => {
    if (!imageByteArray) return;

    let byteText = "";
    for (let i = 0; i < imageByteArray.length; i++) {
        byteText += `0x${imageByteArray[i].toString(16).padStart(2, '0')}`;
        if (i < imageByteArray.length - 1) {
            byteText += `, `;
        }
    }

    navigator.clipboard.writeText(byteText)
        .then(() => {
            copyImageButton.textContent = "Copied!";
            setTimeout(() => {
                copyImageButton.textContent = "Copy Byte";
            }, 2000);
        })
        .catch(() => {
            alert("Failed to copy to clipboard");
        });
});

downloadImageButton.addEventListener('click', () => {
    if (!imageResult.textContent) return;

    const blob = new Blob([imageResult.textContent], {
        type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ImageConverted SEFIANE CHEAT.txt';
    a.click();
    URL.revokeObjectURL(url);

    downloadImageButton.textContent = "Downloaded!";
    setTimeout(() => {
        downloadImageButton.textContent = "Download File";
    }, 2000);
});

// Font Converter
const fontDropArea = document.getElementById('fontDropArea');
const fontInput = document.getElementById('fontInput');
const addFontButton = document.getElementById('addFontButton');
const clearFontButton = document.getElementById('clearFontButton');
const convertFontButton = document.getElementById('convertFontButton');
const fontInfo = document.getElementById('fontInfo');
const fontResult = document.getElementById('fontResult');
const fontActions = document.getElementById('fontActions');
const copyFontButton = document.getElementById('copyFontButton');
const downloadFontButton = document.getElementById('downloadFontButton');

let selectedFont = null;
let fontByteArray = null;

addFontButton.addEventListener('click', () => {
    fontInput.click();
});

fontInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    handleFont(file);
});

fontDropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    fontDropArea.classList.add('dragover');
});

fontDropArea.addEventListener('dragleave', () => {
    fontDropArea.classList.remove('dragover');
});

fontDropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    fontDropArea.classList.remove('dragover');
    const file = event.dataTransfer.files[0];
    handleFont(file);
});

function handleFont(file) {
    if (file && (file.type === "font/ttf" || file.type === "font/otf" || file.name.endsWith('.ttf') || file.name.endsWith('.otf'))) {
        selectedFont = file;

        // Show file info
        fontInfo.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        fontInfo.style.display = 'block';

        // Hide previous results
        fontResult.style.display = 'none';
        fontActions.style.display = 'none';
    } else {
        alert("Please select a valid font file (TTF/OTF).");
    }
}

clearFontButton.addEventListener('click', () => {
    selectedFont = null;
    fontInput.value = "";
    fontInfo.style.display = 'none';
    fontResult.style.display = 'none';
    fontActions.style.display = 'none';
});

convertFontButton.addEventListener('click', () => {
    if (!selectedFont) {
        alert("Please upload a font first.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const array = new Uint8Array(e.target.result);
        fontByteArray = array;

        // Create byte array text
        let byteText = "";
        for (let i = 0; i < array.length; i++) {
            byteText += `0x${array[i].toString(16).padStart(2, '0')}`;
            if (i < array.length - 1) {
                byteText += `, `;
                if ((i + 1) % 16 === 0) byteText += `\n`;
            }
        }

        // Create full content
        let fullContent = `byte[] fontBytes = {\n${byteText}\n};`;

        // Display result
        fontResult.textContent = fullContent;
        fontResult.style.display = 'block';
        fontActions.style.display = 'flex';
    };

    reader.onerror = function() {
        alert("Error reading the font.");
    };

    reader.readAsArrayBuffer(selectedFont);
});

copyFontButton.addEventListener('click', () => {
    if (!fontByteArray) return;

    let byteText = "";
    for (let i = 0; i < fontByteArray.length; i++) {
        byteText += `0x${fontByteArray[i].toString(16).padStart(2, '0')}`;
        if (i < fontByteArray.length - 1) {
            byteText += `, `;
        }
    }

    navigator.clipboard.writeText(byteText)
        .then(() => {
            copyFontButton.textContent = "Copied!";
            setTimeout(() => {
                copyFontButton.textContent = "Copy Byte";
            }, 2000);
        })
        .catch(() => {
            alert("Failed to copy to clipboard");
        });
});

downloadFontButton.addEventListener('click', () => {
    if (!fontResult.textContent) return;

    const blob = new Blob([fontResult.textContent], {
        type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FontConverted SEFIANE CHEAT.txt';
    a.click();
    URL.revokeObjectURL(url);

    downloadFontButton.textContent = "Downloaded!";
    setTimeout(() => {
        downloadFontButton.textContent = "Download File";
    }, 2000);
});


// Color Picker
const colorPicker = document.getElementById('colorPicker');
const hexValue = document.getElementById('hexValue');
const rgbaValue = document.getElementById('rgbaValue');
const rgbFloatValue = document.getElementById('rgbFloatValue');
const cmykValue = document.getElementById('cmykValue');
const hsvValue = document.getElementById('hsvValue');
const hslValue = document.getElementById('hslValue');
const hexPreview = document.getElementById('hexPreview');
const rgbaPreview = document.getElementById('rgbaPreview');
const colorPreviewBox = document.getElementById('colorPreviewBox');

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const a = hex.length > 7 ? parseInt(hex.slice(7, 9), 16) / 255 : 1;
    return {
        r,
        g,
        b,
        a
    };
}

function rgbToCmyk(r, g, b) {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, m, y);

    c = (c - k) / (1 - k) || 0;
    m = (m - k) / (1 - k) || 0;
    y = (y - k) / (1 - k) || 0;

    return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100)
    };
}

function rgbToHsv(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h, s, v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
        h = 0;
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function updateColorValues(hex) {
    const {
        r,
        g,
        b,
        a
    } = hexToRgb(hex);
    const alphaPercent = Math.round(a * 100);

    // Update preview box
    colorPreviewBox.style.background = hex.length > 7 ? hex : `${hex}${Math.round(a * 255).toString(16).padStart(2, '0')}`;
    colorPreviewBox.textContent = hex.length > 7 ? hex : `${hex}${Math.round(a * 255).toString(16).padStart(2, '0')}`;

    // Update values
    hexValue.textContent = hex.toUpperCase();
    rgbaValue.textContent = `${r}, ${g}, ${b}, ${a.toFixed(2)}`;

    // Update float values
    const rFloat = (r / 255).toFixed(2);
    const gFloat = (g / 255).toFixed(2);
    const bFloat = (b / 255).toFixed(2);
    rgbFloatValue.textContent = `${rFloat}f, ${gFloat}f, ${bFloat}f`;

    // Update CMYK
    const {
        c,
        m,
        y,
        k
    } = rgbToCmyk(r, g, b);
    cmykValue.textContent = `${c}%, ${m}%, ${y}%, ${k}%`;

    // Update HSV
    const {
        h: hHsv,
        s: sHsv,
        v: vHsv
    } = rgbToHsv(r, g, b);
    hsvValue.textContent = `${hHsv}°, ${sHsv}%, ${vHsv}%`;

    // Update HSL
    const {
        h: hHsl,
        s: sHsl,
        l: lHsl
    } = rgbToHsl(r, g, b);
    hslValue.textContent = `${hHsl}°, ${sHsl}%, ${lHsl}%`;

    // Update preview colors
    hexPreview.style.backgroundColor = hex;
    rgbaPreview.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
}

colorPicker.addEventListener('input', (event) => {
    const selectedColor = event.target.value;
    updateColorValues(selectedColor);
});

// Initialize with default color
updateColorValues(colorPicker.value);

// Copy to clipboard function
function copyToClipboard(button, text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            button.style.backgroundColor = "#4CAF50";
            setTimeout(() => {
                button.style.backgroundColor = "";
            }, 500);
        })
        .catch(() => {
            button.style.backgroundColor = "#000000";
            setTimeout(() => {
                button.style.backgroundColor = "";
            }, 1000);
        });
}

// Add event to all copy buttons
document.querySelectorAll('.copyButton').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            copyToClipboard(button, targetElement.textContent);
        }
    });
});

// Snow Particles Animation - ULTRA LIGHT
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = document.body.scrollHeight;

const snowCount = 40; // ULTRA LIGHT - فقط 40 حبة
const snowflakes = [];

class Snowflake {
    constructor() {
        this.reset(true);
    }

    reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : -10;
        this.size = Math.random() * 2 + 0.5; // 0.5-2.5px فقط
        this.speed = Math.random() * 0.3 + 0.2; // بطيء جداً
        this.wind = Math.random() * 0.15 - 0.075; // رياح خفيفة جداً
        this.opacity = Math.random() * 0.25 + 0.1; // شفافية عالية
        this.swing = Math.random() * Math.PI * 2;
        this.swingSpeed = Math.random() * 0.005 + 0.002;
        this.swingRadius = Math.random() * 0.2 + 0.1;
    }

    update() {
        this.y += this.speed;
        this.swing += this.swingSpeed;
        this.x += this.wind + Math.sin(this.swing) * this.swingRadius;

        if (this.y > canvas.height + 10 || this.x < -10 || this.x > canvas.width + 10) {
            this.reset();
        }
    }

    draw() {
        // بدون أي تأثيرات - رسم مباشر فقط
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < snowCount; i++) {
    snowflakes.push(new Snowflake());
}

function animateSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (canvas.width !== window.innerWidth || canvas.height !== document.body.scrollHeight) {
        canvas.width = window.innerWidth;
        canvas.height = document.body.scrollHeight;
    }

    snowflakes.forEach(flake => {
        flake.update();
        flake.draw();
    });

    requestAnimationFrame(animateSnow);
}

animateSnow();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
});


// CS to Offsets Converter
const csDropArea = document.getElementById('csDropArea');
const csInput = document.getElementById('csInput');
const addCsButton = document.getElementById('addCsButton');
const clearCsButton = document.getElementById('clearCsButton');
const extractOffsetsButton = document.getElementById('extractOffsetsButton');
const csFileInfo = document.getElementById('csFileInfo');
const csStatus = document.getElementById('csStatus');
const csResult = document.getElementById('csResult');
const csActions = document.getElementById('csActions');
const copyCsButton = document.getElementById('copyCsButton');
const downloadCsButton = document.getElementById('downloadCsButton');

let csFileContent = "";

// قاعدة البيانات المحدثة - جميع الـ Offsets
const searchSections = [
    {
        section: "Bones - Player (Head, Body, Limbs)",
        entries: {
            "Head":                  "OLCJOGDHJJJ",
            "Root":                  "MPJBGDJJJMJ",
            "Chest / Spine":         "HCLMADAFLPD",
            "Hip / Pelvis":          "OLJBCONDGLO",
            "Left Ankle":            "BMGCHFGEDDA",
            "Right Ankle":           "AGHJLIMNPJA",
            "Left Toe":              "FDMBKCKMODA",
            "Right Toe":             "CKABHDJDMAP",
            "Left Shoulder":         "LIBEIIIAGIK",
            "Right Shoulder":        "HDEPJIBNIIK",
            "Right Hand":            "NJDDAPKPILB",
            "Left Hand":             "JHIBMHEMJOL",
            "Right Forearm":         "JBACCHNMGNJ",
            "Left Forearm":          "FGECMMJKFNC",
      
        }
    },

    {
        section: "Match & Game Core",
        entries: {
            "CurrentMatch":          "0x50",
            "MatchStatus":           "LICPHHNNPPF ILGECLEFCCO",
            "LocalPlayer":           "Player FJPEHEGICBO",
            "CurrentObserver":       "FNCMBMMKLLI BGGJJKKKFDC"
        }
    },

    {
        section: "Player Status & Info",
        entries: {
            "Player_IsDead":         "bool FHMPKFMFEPM",
            "Player_Name":           "string OIAJCBLDHKP",
            "AvatarManager":         "AvatarManager FOGJNGDMJKJ",
            "FollowCamera":          "FollowCamera CHDOHNOEBML",
            "AimRotation":           "Quaternion <KCFEHMAIINO>k__BackingField",
            "XPose":                 "FBCAHNCLMDC ADFIDIPODGK",
            "IsClientBot":           "public bool IsClientBot"
        }
    },

    {
        section: "Weapon & Combat",
        entries: {
            "Weapon":                "GPBDEDFKJNA ActiveUISightingWeapon",
            "Player_WeaponData":     "int KDKFDCPBIGE",
            "WeaponData":            "0x58",
            "WeaponRecoil":          "float EFMCDHABKGP",
            "sAim1":                 "bool <LPEIEILIKGC>k__BackingField",
            "sAim2":                 "MADMMIICBNN GEGFCFDGGGP",
            "sAim3":                 "Vector3 BOGOIAMJFDN; // 0x38",
            "sAim4":                 "Vector3 NHKKHPLFMNG; // 0x2C",
            "HeadCollider":          "Collider HECFNHJKOMN",
            "NoReload":              "ShootNoReload",
            "IscombineWeapon":       "IEnumerator HJJLDBKKDDM",
            "CombineWeaponOnHand":   "HMNOKCEINKD AIOLLDLNKFG",
            "WeaponOnHand":          "AAHMJHHPECM LFEPIIENLAF",
            "UnkPlayerWeaponInfo":   "NPCNMJAGIKI COLEAPKGFLK"
        }
    },

    {
        section: "Avatar & Visibility",
        entries: {
            "Avatar":                "IUmaAvatar EEAGBKBMBLD",
            "AvtarData":             "public UMAData umaData",
            "AvtarData_IsTeam":      "public bool isTeammate",
            "Avatar_IsVisible":      "private bool IsVisible;"
        }
    },

    {
        section: "Observer & View Matrix",
        entries: {
            "ObserverPlayer":        "Player NJMDHHGDNPJ;",
            "ViewMatrixV1":          "private VisualElement.TypeData m_TypeDataprivate VisualElement.TypeData m_TypeData;",
            "ViewMatrixV2":          "<>f__mg$cache9"
        }
    },

    {
        section: "Camera & Player Movement",
        entries: {
            "MainCameraTransform":   "Transform MainCameraTransform;",
            "Camera":                "protected Camera FCKFGJMEECI;",
            "camera up":         "private float PECENLKCBLJ;",
            "camera left":       "private byte GJIDOPDDOCI;",
            "vision+protected":  "private float NAPGJKCEMEL;",
            "FallingSpeedUpScale":   "public float FallingSpeedUpScale;",
            "RunSpeedUpScale":       "public float RunSpeedUpScale;",
            "No grvity":             "Player.KHDMPGBLNCM IBHJOIGFAEH;"
        }
    },

    {
        section: "Ammoinclip",
        entries: {
            "BuffWeaponMoveSpeedScale": "public float BuffWeaponMoveSpeedScale;",
            "BuffWeaponAmmoClip":      "public int BuffWeaponAmmoClip;"
        }
    },

    {
        section: "Player Data & Attributes",
        entries: {
            "Player_Data":           "IPRIDataPool m_PRIDataPool",
            "PlayerAttributes":      "protected PlayerAttributes JKPFFNEMJIF",
            "Player_ShadowBase":     "PlayerNetwork.HHCBNAPCKHF m_ShadowState",
            "DictionaryEntities":    "Dictionary<uint, ReplicationEntity> m_ReplicationEntitis"
        }
    },

    {
        section: "ESP Features",
        entries: {
            "Esp id":                "private ResourceID AFALJOPIIHO",
            "Esp level":             "public static readonly ResourceID BACKGROUND_CHAMPIONSHIP_TEAM_PROFILE",
            "IS_FIRING":             "private bool <LPEIEILIKGC>k__BackingField"
        }
    },

    {
        section: "Miscellaneous / Time",
        entries: {
            "GameTimer":             "m_DeltaTime; // 0x10",
            "FixedDeltaTime":        "m_FixedDeltaTime;"
        }
    },

    {
        section: "TeleportMark Offsets",
        entries: {
            "UIInGameScene":         "UIInGameScene KKDICEBFNAP;",
            "BigMapCtrl":            "m_BigMapCtrl;",
            "MapContentCtrl":        "m_MapContentCtrl;",
            "LocalMapMarkController": "m_LocalMapMarkController;",
            "MarkedPosition":        "private Vector3 m_Position;"
        }
    }
];

// ────────────────────────────────────────────────
// دالة استخراج الـ Offsets مع التنسيق المطلوب: uintptr_t Name = 0xXXXX;
// ────────────────────────────────────────────────

function extractOffsets() {
    if (!csFileContent) {
        csStatus.textContent = "لم يتم تحميل أي ملف .cs بعد";
        csStatus.style.color = "#ff5252";
        return;
    }

    const lines = csFileContent.split('\n');
    let result = "Extracted Offsets & References\nGenerated by SEFIANE CHEATS\n";
    let foundAny = false;

    // قائمة العناصر التي تحتاج نتيجة ثانية
    const secondMatchEntries = [
        "LocalPlayer",
        "Player_IsDead",
        "AvatarManager",
        "Player_Data"
    ];

    // قائمة العناصر التي تحتاج نتيجة ثالثة
    const thirdMatchEntries = [
        "MarkedPosition"
    ];

    searchSections.forEach(section => {
        if (Object.keys(section.entries).length === 0) {
            result += "\n";
            return;
        }

        result += `\n// ${section.section}\n`;

        Object.entries(section.entries).forEach(([name, searchStr]) => {
            // بحث مرن باستخدام RegExp (يتجاهل المسافات الزائدة والحساسية لحالة الأحرف)
            const regex = new RegExp(searchStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
            
            // البحث عن جميع النتائج
            const matchingLines = lines.filter(l => regex.test(l.trim()));
            
            if (matchingLines.length > 0) {
                // إذا كان العنصر يحتاج نتيجة ثالثة
                if (thirdMatchEntries.includes(name) && matchingLines.length > 2) {
                    const thirdLine = matchingLines[2];
                    let offset3 = "غير موجود";
                    
                    const commentMatch3 = thirdLine.match(/\/\/\s*(0x[0-9a-fA-F]+)/i);
                    if (commentMatch3) {
                        offset3 = commentMatch3[1];
                    } else {
                        const hexMatch3 = thirdLine.match(/0x[0-9a-fA-F]+/i);
                        if (hexMatch3) {
                            offset3 = hexMatch3[0];
                        }
                    }

                    result += `uintptr_t ${name} = ${offset3};\n`;
                    foundAny = true;
                }
                // إذا كان العنصر يحتاج نتيجة ثانية فقط
                else if (secondMatchEntries.includes(name) && matchingLines.length > 1) {
                    const secondLine = matchingLines[1];
                    let offset2 = "غير موجود";
                    
                    const commentMatch2 = secondLine.match(/\/\/\s*(0x[0-9a-fA-F]+)/i);
                    if (commentMatch2) {
                        offset2 = commentMatch2[1];
                    } else {
                        const hexMatch2 = secondLine.match(/0x[0-9a-fA-F]+/i);
                        if (hexMatch2) {
                            offset2 = hexMatch2[0];
                        }
                    }

                    result += `uintptr_t ${name} = ${offset2};\n`;
                    foundAny = true;
                } else if (!secondMatchEntries.includes(name) && !thirdMatchEntries.includes(name)) {
                    // باقي العناصر تظهر النتيجة الأولى فقط
                    const firstLine = matchingLines[0];
                    let offset1 = "غير موجود";
                    
                    const commentMatch1 = firstLine.match(/\/\/\s*(0x[0-9a-fA-F]+)/i);
                    if (commentMatch1) {
                        offset1 = commentMatch1[1];
                    } else {
                        const hexMatch1 = firstLine.match(/0x[0-9a-fA-F]+/i);
                        if (hexMatch1) {
                            offset1 = hexMatch1[0];
                        }
                    }

                    result += `uintptr_t ${name} = ${offset1};\n`;
                    foundAny = true;
                } else {
                    // العناصر التي تحتاج نتيجة (ثانية أو ثالثة) لكن لم توجد التطابقات الكافية
                    result += `uintptr_t ${name} = غير موجود;\n`;
                }
            } else {
                result += `uintptr_t ${name} = غير موجود;\n`;
            }
        });

        result += "\n";
    });

    if (!foundAny) {
        result += "\nلم يتم العثور على أي من العناصر المطلوبة في الملف.\n";
    }

    csResult.textContent = result;
    csResult.style.display = 'block';
    csActions.style.display = 'flex';
    csStatus.textContent = "تم استخراج البيانات بنجاح";
    csStatus.style.color = "#4caf50";
}

// ────────────────────────────────────────────────
// باقي الدوال (بدون تغيير كبير)
// ────────────────────────────────────────────────

function handleCsFile(file) {
    if (!file || !file.name.endsWith('.cs')) {
        csStatus.textContent = "يرجى اختيار ملف .cs صالح";
        csStatus.style.color = "#ff5252";
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        csFileContent = e.target.result;
        csFileInfo.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        csFileInfo.style.display = 'block';
        csStatus.textContent = "تم تحميل الملف بنجاح. جاهز للاستخراج";
        csStatus.style.color = "#4caf50";
        csResult.style.display = 'none';
        csActions.style.display = 'none';
    };
    reader.readAsText(file);
}

function clearCsFile() {
    csFileContent = "";
    csInput.value = "";
    csFileInfo.style.display = 'none';
    csResult.style.display = 'none';
    csActions.style.display = 'none';
    csStatus.textContent = "تم مسح الملف";
    csStatus.style.color = "#ffffff";
}

function copyCsResult() {
    if (!csResult.textContent) return;
    navigator.clipboard.writeText(csResult.textContent)
        .then(() => {
            copyCsButton.textContent = "تم النسخ!";
            setTimeout(() => copyCsButton.textContent = "Copy Offsets", 2000);
        })
        .catch(() => alert("فشل النسخ إلى الحافظة"));
}

function downloadCsResult() {
    if (!csResult.textContent) return;
    const blob = new Blob([csResult.textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SEFIANE_Offsets_Extracted.txt';
    a.click();
    URL.revokeObjectURL(url);
    downloadCsButton.textContent = "تم التحميل!";
    setTimeout(() => downloadCsButton.textContent = "Download File", 2000);
}

// ربط الأحداث
addCsButton.addEventListener('click', () => csInput.click());
csInput.addEventListener('change', (e) => handleCsFile(e.target.files[0]));
csDropArea.addEventListener('dragover', e => { e.preventDefault(); csDropArea.classList.add('dragover'); });
csDropArea.addEventListener('dragleave', () => csDropArea.classList.remove('dragover'));
csDropArea.addEventListener('drop', e => {
    e.preventDefault();
    csDropArea.classList.remove('dragover');
    handleCsFile(e.dataTransfer.files[0]);
});
extractOffsetsButton.addEventListener('click', extractOffsets);
clearCsButton.addEventListener('click', clearCsFile);
copyCsButton.addEventListener('click', copyCsResult);
downloadCsButton.addEventListener('click', downloadCsResult);

// ────────────────────────────────────────────────
// AOB Cheat - Ultimate Edition
// ────────────────────────────────────────────────

// Populate amount select (2-20)
const aobAmountSelect = document.getElementById('amountSelect');
for (let i = 2; i <= 20; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    if (i === 2) option.selected = true;
    aobAmountSelect.appendChild(option);
}

let aobGeneratedData = [];

function parseHexOffset(offsetStr) {
    let clean = offsetStr.trim();
    if (!clean.startsWith('0x')) clean = '0x' + clean;
    return parseInt(clean, 16);
}

function formatHexOffset(value) {
    if (value < 0x01) value = 0x01;
    if (value > 0xFF) value = 0xFF;
    return '0x' + value.toString(16).toUpperCase();
}

// Remove first hex value from AOB (for DECREASE)
function removeFirstHex(aobArray) {
    for (let i = 0; i < aobArray.length; i++) {
        if (aobArray[i] !== '??' && aobArray[i] !== '?') {
            aobArray.splice(i, 1);
            break;
        }
    }
    return aobArray;
}

// Add 00 at the beginning of AOB (for INCREASE)
function addFirstHex(aobArray) {
    aobArray.unshift('00');
    return aobArray;
}

// Preserve last values (A5 43 or any last values stay same)
function preserveLastValues(originalArray, newArray) {
    if (originalArray.length >= 2 && newArray.length >= 2) {
        newArray[newArray.length - 2] = originalArray[originalArray.length - 2];
        newArray[newArray.length - 1] = originalArray[originalArray.length - 1];
    }
    return newArray;
}

function generateAOBVariants(originalAOB, headHex, chestHex, mode, amount) {
    let variants = [];
    let currentAOB = [...originalAOB];
    let currentHead = headHex;
    let currentChest = chestHex;

    for (let step = 1; step <= amount; step++) {
        if (mode === 'decrease') {
            // DECREASE: Remove one hex from beginning
            currentAOB = removeFirstHex([...currentAOB]);
            currentHead = currentHead - 1;
            currentChest = currentChest - 1;
        } else {
            // INCREASE: Add 00 at beginning
            currentAOB = addFirstHex([...currentAOB]);
            currentHead = currentHead + 1;
            currentChest = currentChest + 1;
        }

        // Clamp offset values (0x01 to 0xFF)
        if (currentHead < 0x01) currentHead = 0x01;
        if (currentHead > 0xFF) currentHead = 0xFF;
        if (currentChest < 0x01) currentChest = 0x01;
        if (currentChest > 0xFF) currentChest = 0xFF;

        // Preserve last values (A5 43)
        currentAOB = preserveLastValues(originalAOB, currentAOB);

        variants.push({
            step: step,
            aob: currentAOB.join(' '),
            head: currentHead,
            chest: currentChest
        });
    }
    return variants;
}

async function simulateAOBProgress(variants, mode) {
    const consoleDiv = document.getElementById('consoleLog');
    const progressFill = document.getElementById('progressFill');
    const percSpan = document.getElementById('percSpan');
    const statusMsg = document.getElementById('statusMsg');

    consoleDiv.innerHTML = '<div class="log-line">[SEFIANE] 🔄 Generating AOB variants (±1 shift)...</div>';
    
    for (let i = 0; i < variants.length; i++) {
        let percent = ((i + 1) / variants.length) * 100;
        progressFill.style.width = percent + '%';
        percSpan.innerText = Math.floor(percent) + '%';
        statusMsg.innerText = `⚡ Generating variant ${i+1}/${variants.length}`;
        
        consoleDiv.innerHTML += `<div class="log-line">[STEP ${i+1}] AOB = ${variants[i].aob.substring(0, 80)}...</div>`;
        consoleDiv.innerHTML += `<div class="log-line">[STEP ${i+1}] HEAD = ${formatHexOffset(variants[i].head)} | CHEST = ${formatHexOffset(variants[i].chest)}</div>`;
        consoleDiv.scrollTop = consoleDiv.scrollHeight;
        
        await new Promise(r => setTimeout(r, 150));
    }
    
    progressFill.style.width = '100%';
    percSpan.innerText = '100%';
    statusMsg.innerText = '✅ Generation complete!';
    consoleDiv.innerHTML += `<div class="log-line">🎉 SUCCESS: ${variants.length} variants generated</div>`;
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

document.getElementById('processBtn').addEventListener('click', async () => {
    let aobText = document.getElementById('aobInput').value.trim();
    let headRaw = document.getElementById('headOffset').value.trim();
    let chestRaw = document.getElementById('chestOffset').value.trim();
    let mode = document.getElementById('operationMode').value;
    let amount = parseInt(document.getElementById('amountSelect').value);

    if (!aobText) {
        alert("Please paste AOB code");
        return;
    }

    let headVal = parseHexOffset(headRaw);
    let chestVal = parseHexOffset(chestRaw);

    if (isNaN(headVal) || headVal < 0x01 || headVal > 0xFF) {
        alert("HEAD OFFSET must be between 0x01 and 0xFF");
        return;
    }
    if (isNaN(chestVal) || chestVal < 0x01 || chestVal > 0xFF) {
        alert("CHEST OFFSET must be between 0x01 and 0xFF");
        return;
    }
    if (amount < 2 || amount > 20) {
        alert("Amount must be between 2 and 20");
        return;
    }

    let originalTokens = aobText.split(/\s+/);
    
    let variants = generateAOBVariants(originalTokens, headVal, chestVal, mode, amount);
    
    if (variants.length === 0) {
        alert("No variants generated! Check your AOB format.");
        return;
    }

    aobGeneratedData = { variants, mode, originalAOB: aobText, originalHead: headRaw, originalChest: chestRaw };
    
    await simulateAOBProgress(variants, mode);
});

document.getElementById('downloadBtn').addEventListener('click', () => {
    if (!aobGeneratedData.variants || aobGeneratedData.variants.length === 0) {
        alert("No generated data! Please click GENERATE first.");
        return;
    }

    let timestamp = new Date().toLocaleString();
    let filename = `SEFIANE_CHEAT_CODES.txt`;
    
    let content = `=================================================
⚡ SEFIANE CHEAT - ULTIMATE EDITION ⚡
=================================================
Original AOB: ${aobGeneratedData.originalAOB}
Original HEAD: ${aobGeneratedData.originalHead}
Original CHEST: ${aobGeneratedData.originalChest}
Mode: ${aobGeneratedData.mode === 'decrease' ? 'DECREASE (-1)' : 'INCREASE (+1)'}
Generated Variants: ${aobGeneratedData.variants.length}
Timestamp: ${timestamp}
=================================================\n\n`;

    for (let i = 0; i < aobGeneratedData.variants.length; i++) {
        let v = aobGeneratedData.variants[i];
        content += `=================================================
SEFIANE CHEAT - VARIANT ${i+1}
=================================================
AOB=${v.aob}
HEAD_OFFSET=${formatHexOffset(v.head)}
CHEST_OFFSET=${formatHexOffset(v.chest)}
=================================================
# Generated with advanced engine
# Timestamp: ${timestamp}
--------------------------------------------\n\n`;
    }

    const blob = new Blob([content], {type: 'text/plain'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
    
    const consoleDiv = document.getElementById('consoleLog');
    consoleDiv.innerHTML += `<div class="log-line">📁 Downloaded: ${filename}</div>`;
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
});


