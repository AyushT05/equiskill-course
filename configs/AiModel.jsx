const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a Course Tutorial on Following Details With field as Course Name,Description,Along with Chapter Name,about,Duration: Category: '12th Class', Topic: Physics Description:Units and Measurements, Level:Basic, Duration:1 hours, NoOfChapters:5, Language:Kannada, Board:CBSE in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"Course Name\": \"ಭೌತಶಾಸ್ತ್ರ - ಘಟಕಗಳು ಮತ್ತು ಮಾಪನಗಳು (Physics - Units and Measurements)\",\n  \"Description\": \"12ನೇ ತರಗತಿಯ ಭೌತಶಾಸ್ತ್ರದ ಘಟಕಗಳು ಮತ್ತು ಮಾಪನಗಳ ಮೂಲಭೂತ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ಕನ್ನಡದಲ್ಲಿ ಕಲಿಯಿರಿ. CBSE ಬೋರ್ಡ್‌ಗೆ ಅನುಗುಣವಾಗಿ ಈ ಕೋರ್ಸ್, ಪರಿಮಾಣಗಳು, ಘಟಕಗಳು, ದೋಷಗಳು ಮತ್ತು ಮಾಪನ ತಂತ್ರಗಳನ್ನು ಪರಿಚಯಿಸುತ್ತದೆ. (Learn the basic concepts of Units and Measurements in Physics for 12th class in Kannada. This course, aligned with the CBSE board, introduces quantities, units, errors and measurement techniques.)\",\n  \"Category\": \"12th Class\",\n  \"Topic\": \"Physics - Units and Measurements\",\n  \"Level\": \"Basic\",\n  \"Duration\": \"1 hour\",\n  \"NoOfChapters\": 5,\n  \"Language\": \"Kannada\",\n  \"Board\": \"CBSE\",\n  \"Chapters\": [\n    {\n      \"Chapter Name\": \"ಘಟಕಗಳು ಮತ್ತು ಆಯಾಮಗಳು (Units and Dimensions)\",\n      \"About\": \"ಭೌತಿಕ ಪ್ರಮಾಣಗಳು, ಮೂಲಭೂತ ಮತ್ತು ವ್ಯುತ್ಪನ್ನ ಘಟಕಗಳು, ಘಟಕಗಳ ವ್ಯವಸ್ಥೆಗಳು (SI, CGS, FPS), ಆಯಾಮಗಳ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಅದರ ಅನ್ವಯಗಳು. (Physical quantities, fundamental and derived units, systems of units (SI, CGS, FPS), dimensional analysis and its applications.)\",\n      \"Duration\": \"15 minutes\"\n    },\n    {\n      \"Chapter Name\": \"ಮಾಪನದ ನಿಖರತೆ ಮತ್ತು ದೋಷಗಳು (Accuracy and Errors in Measurement)\",\n      \"About\": \"ಮಾಪನದಲ್ಲಿ ನಿಖರತೆ, ದೋಷಗಳ ವಿಧಗಳು (ವ್ಯವಸ್ಥಿತ, ಯಾದೃಚ್ಛಿಕ), ದೋಷಗಳ ಪ್ರಸರಣ ಮತ್ತು ಗಮನಾರ್ಹ ಅಂಕಿಅಂಶಗಳು. (Accuracy in measurement, types of errors (systematic, random), propagation of errors and significant figures.)\",\n      \"Duration\": \"12 minutes\"\n    },\n    {\n      \"Chapter Name\": \"ಮಾಪನ ಉಪಕರಣಗಳು (Measuring Instruments)\",\n      \"About\": \"ವಿವಿಧ ರೀತಿಯ ಮಾಪನ ಉಪಕರಣಗಳು (ವರ್ನಿಯರ್ ಕ್ಯಾಲಿಪರ್‌ಗಳು, ಸ್ಕ್ರೂ ಗೇಜ್, ಇತ್ಯಾದಿ), ಅವುಗಳ ಕೆಲಸದ ತತ್ವ ಮತ್ತು ಲೀಸ್ಟ್ ಕೌಂಟ್. (Different types of measuring instruments (Vernier calipers, screw gauge, etc.), their working principle and least count.)\",\n      \"Duration\": \"13 minutes\"\n    },\n    {\n      \"Chapter Name\": \"ಘಟಕ ಪರಿವರ್ತನೆಗಳು (Unit Conversions)\",\n      \"About\": \"ಒಂದು ಘಟಕ ವ್ಯವಸ್ಥೆಯಿಂದ ಇನ್ನೊಂದಕ್ಕೆ ಪರಿವರ್ತನೆ ಮಾಡುವುದು, ಪರಿವರ್ತನೆ ಅಂಶಗಳನ್ನು ಬಳಸುವುದು ಮತ್ತು ಲೆಕ್ಕಾಚಾರದಲ್ಲಿ ಅವುಗಳ ಅನ್ವಯ. (Converting from one unit system to another, using conversion factors and their application in calculations.)\",\n      \"Duration\": \"10 minutes\"\n    },\n    {\n      \"Chapter Name\": \"ಸಮಸ್ಯೆ ಪರಿಹಾರ (Problem Solving)\",\n      \"About\": \"ಘಟಕಗಳು ಮತ್ತು ಮಾಪನಗಳ ಪರಿಕಲ್ಪನೆಗಳ ಮೇಲೆ ವಿವಿಧ ಸಮಸ್ಯೆಗಳನ್ನು ಬಿಡಿಸುವುದು. (Solving various problems based on the concepts of units and measurements.)\",\n      \"Duration\": \"20 minutes\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });

    export const GenerateChapterContent_AI = model.startChat({
      generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "explain the concept in Detail on Topic: Python Basic,Chapter:Variable and Data Types,Board:CBSE,Language: Kannada in JSON Format with list of array with field as title, explanation on given chapter in detail, Code Example(Code field in <precode> format) if applicable"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"chapter\": \"Variable and Data Types\",\n  \"board\": \"CBSE\",\n  \"language\": \"Kannada\",\n  \"topics\": [\n    {\n      \"title\": \"ಚರಾಕ್ಷರಗಳು (Variables) - ಪರಿಚಯ\",\n      \"explanation\": \"ಪೈಥಾನ್‌ನಲ್ಲಿ, ಚರಾಕ್ಷರಗಳು ಡಾಟಾವನ್ನು ಸಂಗ್ರಹಿಸಲು ಬಳಸುವ ಹೆಸರುಗಳು. ಇವು ಒಂದು ಮೆಮೊರಿ ಸ್ಥಳವನ್ನು ಉಲ್ಲೇಖಿಸುತ್ತವೆ, ಅಲ್ಲಿ ನಾವು ಸಂಖ್ಯೆಗಳು, ಅಕ್ಷರಗಳು ಅಥವಾ ಇತರ ಡಾಟಾವನ್ನು ಶೇಖರಿಸಿಡಬಹುದು. ಚರಾಕ್ಷರಕ್ಕೆ ಒಂದು ಹೆಸರನ್ನು ನೀಡುವಾಗ ಕೆಲವು ನಿಯಮಗಳನ್ನು ಅನುಸರಿಸಬೇಕು. ಹೆಸರಿನ ಪ್ರಾರಂಭದಲ್ಲಿ ಸಂಖ್ಯೆ ಇರಬಾರದು, ವಿಶೇಷ ಚಿಹ್ನೆಗಳನ್ನು ಬಳಸಬಾರದು, ಮತ್ತು ಕೀವರ್ಡ್‌ಗಳನ್ನು (Keywords) ಚರಾಕ್ಷರದ ಹೆಸರಾಗಿ ಬಳಸಬಾರದು. ಚರಾಕ್ಷರಗಳನ್ನು ಘೋಷಿಸಲು '=' ಚಿಹ್ನೆಯನ್ನು ಬಳಸಲಾಗುತ್ತದೆ.\",\n      \"code_example\": null\n    },\n    {\n      \"title\": \"ಚರಾಕ್ಷರಗಳಿಗೆ ಹೆಸರು ಕೊಡುವ ನಿಯಮಗಳು (Variable Naming Rules)\",\n      \"explanation\": \"ಚರಾಕ್ಷರಗಳಿಗೆ ಹೆಸರು ಕೊಡುವಾಗ ಈ ಕೆಳಗಿನ ನಿಯಮಗಳನ್ನು ಅನುಸರಿಸಬೇಕು:\\n\\n*   ಹೆಸರು ಅಕ್ಷರದಿಂದ (A-Z, a-z) ಅಥವಾ ಅಂಡರ್‌ಸ್ಕೋರ್‌ನಿಂದ (_) ಪ್ರಾರಂಭವಾಗಬೇಕು.\\n*   ಹೆಸರಿನಲ್ಲಿ ಅಕ್ಷರಗಳು, ಸಂಖ್ಯೆಗಳು ಮತ್ತು ಅಂಡರ್‌ಸ್ಕೋರ್ ಮಾತ್ರ ಇರಬಹುದು.\\n*   ಹೆಸರು ಕೇಸ್ ಸೆನ್ಸಿಟಿವ್ (case-sensitive) ಆಗಿರುತ್ತದೆ (ಉದಾಹರಣೆಗೆ, `age` ಮತ್ತು `Age` ಬೇರೆ ಬೇರೆ ಚರಾಕ್ಷರಗಳು).\\n*   ಪೈಥಾನ್‌ನ ಕೀವರ್ಡ್‌ಗಳನ್ನು (keywords) ಚರಾಕ್ಷರದ ಹೆಸರಾಗಿ ಬಳಸಬಾರದು (ಉದಾಹರಣೆಗೆ, `if`, `else`, `for`, `while` ಇತ್ಯಾದಿ).\",\n      \"code_example\": null\n    },\n    {\n      \"title\": \"ಡಾಟಾ ವಿಧಗಳು (Data Types) - ಪರಿಚಯ\",\n      \"explanation\": \"ಪೈಥಾನ್ ಹಲವಾರು ಡಾಟಾ ವಿಧಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ, ಅವುಗಳಲ್ಲಿ ಮುಖ್ಯವಾದವುಗಳನ್ನು ಕೆಳಗೆ ವಿವರಿಸಲಾಗಿದೆ.\\n\\n*   <b>ಪೂರ್ಣಾಂಕ (Integer):</b> ಪೂರ್ಣ ಸಂಖ್ಯೆಗಳನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತದೆ (ಉದಾಹರಣೆಗೆ: 10, -5, 0).\\n*   <b>ದಶಮಾಂಶ (Float):</b> ದಶಮಾಂಶ ಬಿಂದುವುಳ್ಳ ಸಂಖ್ಯೆಗಳನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತದೆ (ಉದಾಹರಣೆಗೆ: 3.14, -2.5).\\n*   <b>ಅಕ್ಷರ (String):</b> ಅಕ್ಷರಗಳ ಸರಣಿಯನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತದೆ (ಉದಾಹರಣೆಗೆ: \\\"Hello\\\", 'Python').\\n*   <b>ಸತ್ಯ/ಸುಳ್ಳು (Boolean):</b> ಸತ್ಯ (True) ಅಥವಾ ಸುಳ್ಳು (False) ಮೌಲ್ಯಗಳನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತದೆ.\",\n      \"code_example\": null\n    },\n    {\n      \"title\": \"ಪೂರ್ಣಾಂಕ (Integer)\",\n      \"explanation\": \"ಪೂರ್ಣಾಂಕಗಳು ದಶಮಾಂಶ ಬಿಂದುವಿಲ್ಲದ ಪೂರ್ಣ ಸಂಖ್ಯೆಗಳನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತವೆ. ಇವು ಧನಾತ್ಮಕ (positive), ಋಣಾತ್ಮಕ (negative) ಅಥವಾ ಸೊನ್ನೆ (zero) ಆಗಿರಬಹುದು.\",\n      \"code_example\": \"<pre><code>age = 25\\nquantity = 100\\nnegative_number = -10</code></pre>\"\n    },\n    {\n      \"title\": \"ದಶಮಾಂಶ (Float)\",\n      \"explanation\": \"ದಶಮಾಂಶ ಸಂಖ್ಯೆಗಳು ದಶಮಾಂಶ ಬಿಂದುವುಳ್ಳ ಸಂಖ್ಯೆಗಳನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತವೆ. ಇವುಗಳನ್ನು ಸಾಮಾನ್ಯವಾಗಿ ಭಾಗಶಃ ಸಂಖ್ಯೆಗಳು ಅಥವಾ ನಿಖರವಾದ ಮೌಲ್ಯಗಳನ್ನು ಪ್ರತಿನಿಧಿಸಲು ಬಳಸಲಾಗುತ್ತದೆ.\",\n      \"code_example\": \"<pre><code>price = 99.99\\npi = 3.14159\\ntemperature = 36.6</code></pre>\"\n    },\n    {\n      \"title\": \"ಅಕ್ಷರ (String)\",\n      \"explanation\": \"ಅಕ್ಷರಗಳು ಅಕ್ಷರಗಳ ಸರಣಿಯನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತವೆ. ಇವುಗಳನ್ನು ಉದ್ಧರಣ ಚಿಹ್ನೆಗಳಲ್ಲಿ (quotation marks) ಸುತ್ತುವರಿಯಲಾಗುತ್ತದೆ. ಏಕ ಉದ್ಧರಣ ಚಿಹ್ನೆಗಳು (') ಅಥವಾ ದ್ವಿಗುಣ ಉದ್ಧರಣ ಚಿಹ್ನೆಗಳು (\\\") ಎರಡನ್ನೂ ಬಳಸಬಹುದು.\",\n      \"code_example\": \"<pre><code>name = \\\"John Doe\\\"\\ncity = 'Bangalore'\\nmessage = \\\"Hello, world!\\\"</code></pre>\"\n    },\n    {\n      \"title\": \"ಸತ್ಯ/ಸುಳ್ಳು (Boolean)\",\n      \"explanation\": \"ಬೂಲಿಯನ್ ಡಾಟಾ ವಿಧವು ಎರಡು ಮೌಲ್ಯಗಳನ್ನು ಮಾತ್ರ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ: `True` (ಸತ್ಯ) ಅಥವಾ `False` (ಸುಳ್ಳು). ಇವುಗಳನ್ನು ತಾರ್ಕಿಕ ಕಾರ್ಯಾಚರಣೆಗಳಲ್ಲಿ (logical operations) ಬಳಸಲಾಗುತ್ತದೆ.\",\n      \"code_example\": \"<pre><code>is_student = True\\nis_raining = False</code></pre>\"\n    },\n    {\n      \"title\": \"ಡಾಟಾ ವಿಧವನ್ನು ಪರಿಶೀಲಿಸುವುದು (Type Checking)\",\n      \"explanation\": \"`type()` ಫಂಕ್ಷನ್ ಬಳಸಿ ಒಂದು ಚರಾಕ್ಷರದ ಡಾಟಾ ವಿಧವನ್ನು ಪರಿಶೀಲಿಸಬಹುದು.\",\n      \"code_example\": \"<pre><code>x = 5\\ny = 3.14\\nz = \\\"Hello\\\"\\n\\nprint(type(x))  # Output: <class 'int'>\\nprint(type(y))  # Output: <class 'float'>\\nprint(type(z))  # Output: <class 'str'></code></pre>\"\n    },\n    {\n      \"title\": \"ಡಾಟಾ ವಿಧ ಪರಿವರ್ತನೆ (Type Conversion)\",\n      \"explanation\": \"ಒಂದು ಡಾಟಾ ವಿಧವನ್ನು ಇನ್ನೊಂದಕ್ಕೆ ಪರಿವರ್ತಿಸಲು ಸಾಧ್ಯವಿದೆ. ಇದನ್ನು ಟೈಪ್ ಕಾಸ್ಟಿಂಗ್ (type casting) ಎನ್ನಲಾಗುತ್ತದೆ. `int()`, `float()`, `str()`, `bool()` ಫಂಕ್ಷನ್‌ಗಳನ್ನು ಇದಕ್ಕಾಗಿ ಬಳಸಲಾಗುತ್ತದೆ.\",\n      \"code_example\": \"<pre><code>x = \\\"10\\\"\\ny = int(x)  # String to Integer\\n\\nz = 5\\nw = float(z)  # Integer to Float\\n\\na = 10\\nb = str(a) # Integer to String\\n\\nc = 0\\nd = bool(c) # Integer to Boolean (0 is False, other numbers are True)\\n\\nprint(y)   # Output: 10\\nprint(w)   # Output: 5.0\\nprint(b)   # Output: \\\"10\\\"\\nprint(d)   # Output: False</code></pre>\"\n    }\n  ]\n}\n```"},
        ],
      },
    ],
  });
  
    //const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    //console.log(result.response.text());
  