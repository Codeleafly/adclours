
import { color, box, log, title, asciiArt, line, gradient, animate, Spinner } from 'adclours';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const termWidth = process.stdout.columns || 80;

// --- Quiz Questions ---
const quizQuestions = [
    {
        question: "Which philosophical concept is central to the works of Friedrich Nietzsche?",
        options: ["Utilitarianism", "Existentialism", "Nihilism", "Rationalism"],
        answer: "Nihilism"
    },
    {
        question: "In quantum mechanics, what does the Heisenberg Uncertainty Principle state?",
        options: ["Energy is conserved", "Particles have definite positions and momenta", "It's impossible to simultaneously know the exact position and momentum of a particle", "Light behaves as both a wave and a particle"],
        answer: "It's impossible to simultaneously know the exact position and momentum of a particle"
    },
    {
        question: "Which ancient civilization developed the concept of zero as a placeholder?",
        options: ["Roman", "Greek", "Mayan", "Egyptian"],
        answer: "Mayan"
    },
    {
        question: "What is the name of the supercontinent that existed approximately 335 million years ago?",
        options: ["Gondwana", "Laurasia", "Pangaea", "Rodinia"],
        answer: "Pangaea"
    },
    {
        question: "Who is credited with inventing the World Wide Web?",
        options: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Mark Zuckerberg"],
        answer: "Tim Berners-Lee"
    },
    {
        question: "Which novel begins with the line 'It was the best of times, it was the worst of times'?",
        options: ["Pride and Prejudice", "1984", "A Tale of Two Cities", "Moby Dick"],
        answer: "A Tale of Two Cities"
    },
    {
        question: "What is the primary function of the Golgi apparatus in a cell?",
        options: ["Energy production", "Protein synthesis", "Waste removal", "Modifying, sorting, and packaging proteins"],
        answer: "Modifying, sorting, and packaging proteins"
    },
    {
        question: "Which war was fought between the United States and Great Britain from 1812 to 1815?",
        options: ["American Revolutionary War", "War of 1812", "Civil War", "Mexican-American War"],
        answer: "War of 1812"
    },
    {
        question: "What is the name of the galaxy that contains our solar system?",
        options: ["Andromeda", "Triangulum", "Whirlpool", "Milky Way"],
        answer: "Milky Way"
    },
    {
        question: "Who composed the opera 'The Marriage of Figaro'?",
        options: ["Ludwig van Beethoven", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Richard Wagner"],
        answer: "Wolfgang Amadeus Mozart"
    },
    {
        question: "Which element has the chemical symbol 'Au'?",
        options: ["Silver", "Gold", "Aluminum", "Argon"],
        answer: "Gold"
    },
    {
        question: "What is the largest desert in the world?",
        options: ["Sahara Desert", "Gobi Desert", "Arabian Desert", "Antarctic Polar Desert"],
        answer: "Antarctic Polar Desert"
    },
    {
        question: "Who developed the theory of general relativity?",
        options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Max Planck"],
        answer: "Albert Einstein"
    },
    {
        question: "Which country is the largest producer of coffee in the world?",
        options: ["Colombia", "Vietnam", "Brazil", "Ethiopia"],
        answer: "Brazil"
    },
    {
        question: "What is the process by which plants convert light energy into chemical energy?",
        options: ["Respiration", "Fermentation", "Photosynthesis", "Transpiration"],
        answer: "Photosynthesis"
    },
    {
        question: "Which famous scientist formulated the laws of motion and universal gravitation?",
        options: ["Galileo Galilei", "Isaac Newton", "Johannes Kepler", "Nicolaus Copernicus"],
        answer: "Isaac Newton"
    },
    {
        question: "What is the deepest oceanic trench in the world?",
        options: ["Puerto Rico Trench", "Java Trench", "Mariana Trench", "Kermadec Trench"],
        answer: "Mariana Trench"
    },
    {
        question: "Which philosophical school emphasizes the importance of individual freedom and responsibility?",
        options: ["Stoicism", "Epicureanism", "Existentialism", "Rationalism"],
        answer: "Existentialism"
    },
    {
        question: "What is the capital city of Canada?",
        options: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
        answer: "Ottawa"
    },
    {
        question: "Which artist painted 'The Starry Night'?",
        options: ["Claude Monet", "Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci"],
        answer: "Vincent van Gogh"
    },
    {
        question: "What is the largest organ in the human body?",
        options: ["Heart", "Brain", "Skin", "Liver"],
        answer: "Skin"
    },
    {
        question: "Which country is known as the 'Land of the Rising Sun'?",
        options: ["China", "South Korea", "Japan", "Thailand"],
        answer: "Japan"
    },
    {
        question: "What is the chemical formula for sulfuric acid?",
        options: ["HCl", "HNO3", "H2SO4", "NaOH"],
        answer: "H2SO4"
    },
    {
        question: "Who wrote 'Don Quixote'?",
        options: ["Miguel de Cervantes", "Gabriel García Márquez", "Jorge Luis Borges", "Pablo Neruda"],
        answer: "Miguel de Cervantes"
    },
    {
        question: "What is the process of a liquid turning into a gas?",
        options: ["Condensation", "Melting", "Evaporation", "Freezing"],
        answer: "Evaporation"
    },
    {
        question: "Which mountain is the highest in Africa?",
        options: ["Mount Kenya", "Mount Kilimanjaro", "Mount Elgon", "Mount Stanley"],
        answer: "Mount Kilimanjaro"
    },
    {
        question: "What is the study of fungi called?",
        options: ["Botany", "Zoology", "Mycology", "Virology"],
        answer: "Mycology"
    },
    {
        question: "Who was the first woman to fly solo across the Atlantic Ocean?",
        options: ["Amelia Earhart", "Bessie Coleman", "Jacqueline Cochran", "Harriet Quimby"],
        answer: "Amelia Earhart"
    },
    {
        question: "Which city hosted the 2000 Summer Olympics?",
        options: ["Athens", "Sydney", "Beijing", "London"],
        answer: "Sydney"
    },
    {
        question: "What is the smallest bone in the human body?",
        options: ["Femur", "Stapes", "Patella", "Humerus"],
        answer: "Stapes"
    },
    {
        question: "Which famous physicist developed the theory of quantum electrodynamics?",
        options: ["Richard Feynman", "Paul Dirac", "Werner Heisenberg", "Erwin Schrödinger"],
        answer: "Richard Feynman"
    },
    {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        answer: "Canberra"
    },
    {
        question: "Which gas is most abundant in Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
        answer: "Nitrogen"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "What is the longest river in South America?",
        options: ["Paraná River", "Magdalena River", "Orinoco River", "Amazon River"],
        answer: "Amazon River"
    },
    {
        question: "Which country is famous for the invention of pizza?",
        options: ["Spain", "Greece", "Italy", "France"],
        answer: "Italy"
    },
    {
        question: "What is the process of a solid turning directly into a gas?",
        options: ["Melting", "Sublimation", "Evaporation", "Condensation"],
        answer: "Sublimation"
    },
    {
        question: "Who wrote 'The Great Gatsby'?",
        options: ["Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "William Faulkner"],
        answer: "F. Scott Fitzgerald"
    },
    {
        question: "What is the largest island in the world?",
        options: ["New Guinea", "Borneo", "Madagascar", "Greenland"],
        answer: "Greenland"
    },
    {
        question: "Which chemical element has the symbol 'Fe'?",
        options: ["Fluorine", "Iron", "Fermium", "Francium"],
        answer: "Iron"
    },
    {
        question: "What is the name of the first artificial satellite launched into space?",
        options: ["Explorer 1", "Vanguard 1", "Sputnik 1", "Luna 1"],
        answer: "Sputnik 1"
    },
    {
        question: "Who is considered the father of modern economics?",
        options: ["Karl Marx", "John Maynard Keynes", "Adam Smith", "Milton Friedman"],
        answer: "Adam Smith"
    },
    {
        question: "Which ocean is the smallest?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Southern Ocean"],
        answer: "Arctic Ocean"
    },
    {
        question: "What is the main ingredient in guacamole?",
        options: ["Tomato", "Onion", "Avocado", "Cilantro"],
        answer: "Avocado"
    },
    {
        question: "Which famous battle was fought in 1066?",
        options: ["Battle of Hastings", "Battle of Agincourt", "Battle of Waterloo", "Battle of Gettysburg"],
        answer: "Battle of Hastings"
    },
    {
        question: "What is the process by which bacteria convert nitrates into nitrogen gas?",
        options: ["Nitrification", "Ammonification", "Denitrification", "Nitrogen Fixation"],
        answer: "Denitrification"
    },
    {
        question: "Who developed the first successful polio vaccine?",
        options: ["Louis Pasteur", "Robert Koch", "Jonas Salk", "Alexander Fleming"],
        answer: "Jonas Salk"
    },
    {
        question: "Which country is home to the Great Barrier Reef?",
        options: ["Indonesia", "Philippines", "Australia", "Fiji"],
        answer: "Australia"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Quartz", "Corundum", "Diamond", "Topaz"],
        answer: "Diamond"
    },
    {
        question: "Which Roman emperor made Christianity the state religion of the Roman Empire?",
        options: ["Augustus", "Nero", "Constantine the Great", "Diocletian"],
        answer: "Constantine the Great"
    },
    {
        question: "What is the name of the phenomenon where light bends as it passes from one medium to another?",
        options: ["Reflection", "Diffraction", "Refraction", "Dispersion"],
        answer: "Refraction"
    },
    {
        question: "Who wrote '1984'?",
        options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "Kurt Vonnegut"],
        answer: "George Orwell"
    },
    {
        question: "What is the largest living structure on Earth?",
        options: ["Amazon Rainforest", "Great Barrier Reef", "Redwood Forest", "Pando (Aspen Grove)"],
        answer: "Great Barrier Reef"
    },
    {
        question: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
        options: ["Mars", "Jupiter", "Venus", "Mercury"],
        answer: "Venus"
    },
    {
        question: "What is the chemical symbol for potassium?",
        options: ["P", "K", "Po", "Pt"],
        answer: "K"
    },
    {
        question: "Who was the first person to step on the Moon?",
        options: ["Buzz Aldrin", "Michael Collins", "Neil Armstrong", "Yuri Gagarin"],
        answer: "Neil Armstrong"
    },
    {
        question: "Which city is famous for its canals and gondolas?",
        options: ["Rome", "Florence", "Venice", "Naples"],
        answer: "Venice"
    },
    {
        question: "What is the process of breaking down food into simpler substances?",
        options: ["Absorption", "Digestion", "Metabolism", "Excretion"],
        answer: "Digestion"
    },
    {
        question: "Which instrument is used to measure atmospheric pressure?",
        options: ["Thermometer", "Anemometer", "Barometer", "Hygrometer"],
        answer: "Barometer"
    },
    {
        question: "Who developed the theory of evolution by natural selection?",
        options: ["Gregor Mendel", "Charles Darwin", "Louis Pasteur", "Alfred Russel Wallace"],
        answer: "Charles Darwin"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// --- Utility Functions ---
const clearScreen = () => {
    process.stdout.write('\x1B[2J\x1B[0f'); // Clear screen and move cursor to top-left
};

const resetTerminal = () => {
    process.stdout.write('\x1B[0m'); // Reset all styles
    clearScreen();
};

// --- Graceful Exit Handler ---
const handleExit = () => {
    clearScreen();
    console.log(color.bold.brightMagenta('BYE!'));
    console.log(color.dim(title('Thanks for playing!', '', termWidth)));
    resetTerminal();
    rl.close();
    process.exit(0);
};

process.on('SIGINT', handleExit); // Handle CTRL+C

// --- Game Functions ---

const displayQuestion = async () => {
    clearScreen();
    const q = quizQuestions[currentQuestionIndex];

    console.log(line(termWidth, color.dim(`Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`)));
    console.log('\n');

    // Styled Question Box
    const questionBoxContent = color.bold.cyan(`Q: ${q.question}`);
    console.log(box(questionBoxContent, { borderColor: 'blue', style: 'double', padding: 1 }));
    console.log('\n');

    // Styled Options
    q.options.forEach((option, index) => {
        console.log(color.yellow(`${index + 1}. ${option}`));
    });
    console.log('\n');

    return new Promise(resolve => {
        rl.question(color.bold.green('Enter your choice (1-' + q.options.length + '): '), (input) => {
            const choice = parseInt(input);
            if (isNaN(choice) || choice < 1 || choice > q.options.length) {
                log.error('Invalid input. Please enter a number between 1 and ' + q.options.length + '.');
                setTimeout(() => displayQuestion().then(resolve), 1500); // Re-ask question after a short delay
            } else {
                resolve(q.options[choice - 1]);
            }
        });
    });
};

const checkAnswer = (selectedAnswer) => {
    const q = quizQuestions[currentQuestionIndex];
    if (selectedAnswer === q.answer) {
        score++;
        log.success('Correct! 🎉');
    } else {
        log.error(`Wrong! The correct answer was: ${color.bold.green(q.answer)}`);
    }
    currentQuestionIndex++;
};

const showResults = () => {
    clearScreen();
    console.log(gradient('RESULTS', '#FFD700', '#FFA500')); // Gold to Orange gradient
    console.log('\n');

    const finalMessage = `You scored ${color.bold.brightGreen(score)} out of ${color.bold.cyan(quizQuestions.length)}!`;
    console.log(box(finalMessage, { borderColor: 'brightMagenta', style: 'double', padding: 2 }));
    console.log('\n');

    if (score === quizQuestions.length) {
        console.log(color.rainbow('🌟 CONGRATULATIONS! You got all answers correct! 🌟'));
        console.log(color.bold.hex('#FFD700')('You are a true quiz master!'));
    } else if (score >= quizQuestions.length / 2) {
        console.log(color.bold.yellow('Good job! You did well.'));
        console.log(color.dim.cyan('Keep learning and improving!'));
    } else {
        console.log(color.bold.red('Keep practicing! You can do better next time.'));
        console.log(color.dim.gray('Don\'t give up, knowledge is power!'));
    }
    console.log('\n');

    rl.question(color.dim('Press Enter to exit...'), () => {
        handleExit();
    });
};

const startGame = async () => {
    clearScreen();
    // --- Advanced Welcome Screen ---
    console.log(color.bold.rgb(138, 43, 226)('QUIZ'));
    console.log(color.bold.rgb(255, 20, 147)('GAME'));
    console.log('\n');

    console.log(title(color.bold.cyan('Test Your Knowledge!'), 'Powered by adclours', termWidth));
    console.log('\n');

    const instructions = `
    ${color.bold.yellow('Instructions:')}
    - Answer the questions by typing the number of your choice.
    - Press ${color.bold.red('CTRL+C')} at any time to exit gracefully.
    - Let's see how much you know!
    `;
    console.log(box(instructions, { borderColor: 'green', style: 'single', padding: 1 }));
    console.log('\n');

    const spinner = new Spinner(['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'], 'Loading quiz...', 80, color.brightMagenta);
    spinner.start();
    await new Promise(resolve => setTimeout(resolve, 3000));
    spinner.stop('✔', 'Quiz Ready!', 'green');
    console.log('\n');

    rl.question(color.bold.blue('Press Enter to start the quiz...'), async () => {
        while (currentQuestionIndex < quizQuestions.length) {
            const selectedAnswer = await displayQuestion();
            checkAnswer(selectedAnswer);
            await new Promise(resolve => setTimeout(resolve, 1500)); // Short pause for feedback
        }
        showResults();
    });
};

// Start the game
startGame();
