{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // --- DOM Elements ---\
// Getting references to the parts of our HTML we need to control.\
const mainContent = document.getElementById('main-content');\
const navLinks = document.querySelectorAll('header .nav-link');\
const mobileNavLinks = document.querySelectorAll('#mobile-menu .nav-link');\
const mobileMenuButton = document.getElementById('mobile-menu-button');\
const mobileMenu = document.getElementById('mobile-menu');\
const genericModal = document.getElementById('genericModal');\
const modalTitle = document.getElementById('modalTitle');\
const modalMessage = document.getElementById('modalMessage');\
const modalCloseButton = document.getElementById('modalCloseButton');\
const modalActionButton = document.getElementById('modalActionButton');\
const modalLoader = document.getElementById('modalLoader');\
\
// --- Modal Functions ---\
// Functions to show, hide, and manage our popup window.\
function showModal(title, message, showActionButton = true) \{\
    modalTitle.textContent = title;\
    modalMessage.innerHTML = message; // Use innerHTML for <br> tags etc.\
    modalLoader.classList.add('hidden');\
    modalMessage.classList.remove('hidden');\
    modalActionButton.textContent = 'Close';\
    modalActionButton.onclick = hideModal;\
    modalActionButton.style.display = showActionButton ? 'block' : 'none';\
    genericModal.classList.add('active');\
\}\
\
function showLoadingModal(title) \{\
    modalTitle.textContent = title;\
    modalMessage.classList.add('hidden');\
    modalLoader.classList.remove('hidden');\
    modalActionButton.style.display = 'none';\
    genericModal.classList.add('active');\
\}\
\
function hideModal() \{\
    genericModal.classList.remove('active');\
\}\
\
// Add event listeners to close the modal.\
modalCloseButton.addEventListener('click', hideModal);\
modalActionButton.addEventListener('click', hideModal);\
genericModal.addEventListener('click', (event) => \{\
    if (event.target === genericModal) \{\
        hideModal();\
    \}\
\});\
\
// --- Gemini API Call Function ---\
// This talks to our *secure helper function* (gemini-proxy.js).\
async function callGeminiAPI(prompt) \{\
    showLoadingModal("\uc0\u10024  Processing Information...");\
    const PROXY_URL = '/.netlify/functions/gemini-proxy'; \
\
    try \{\
        const response = await fetch(PROXY_URL, \{\
            method: 'POST',\
            headers: \{ 'Content-Type': 'application/json' \},\
            body: JSON.stringify(\{ prompt: prompt \}) \
        \});\
\
        const result = await response.json(); \
\
        if (!response.ok || result.error) \{\
            console.error("Proxy/Gemini Error:", result);\
            throw new Error(result.error?.message || result.error || `Request failed with status $\{response.status\}`);\
        \}\
            \
        if (result.candidates && result.candidates.length > 0 &&\
            result.candidates[0].content && result.candidates[0].content.parts &&\
            result.candidates[0].content.parts.length > 0) \{\
            let text = result.candidates[0].content.parts[0].text;\
            text = text.replace(/\\n\\n/g, '<br><br>');\
            text = text.replace(/\\n\\s*\\*\\s/g, '<br>\'95 ');\
            text = text.replace(/\\n\\s*\\d+\\.\\s/g, '<br>1. ');\
            return text;\
        \} else \{\
             console.error("Gemini API unexpected response structure:", result);\
             return "The requested information could not be retrieved or the response format was unexpected.";\
        \}\
    \} catch (error) \{\
        console.error("Error calling Proxy/Gemini API:", error);\
        return `An error occurred: $\{error.message\}. Please try again later.`;\
    \}\
\}\
\
// --- Page Content Definitions ---\
// This holds the actual HTML content for each "page" of our site.\
const pages = \{\
    home: `\
        <div class="hero-bg text-white py-20 md:py-32">\
            <div class="container mx-auto px-6 text-center">\
                <h1 class="text-4xl md:text-6xl font-bold motto-font mb-4">Life Itself is a Laboratory</h1>\
                <p class="text-lg md:text-2xl mb-8 max-w-3xl mx-auto">Welcome to Labdr.net! Explore the fascinating world of biochemistry and investigate the molecular foundations of life with us.</p>\
                <a href="#blogs" data-page="blogs" class="btn btn-primary text-lg inline-block mr-2">Explore Blogs</a>\
                <a href="#about_us" data-page="about_us" class="btn btn-secondary text-lg inline-block">Learn More</a>\
            </div>\
        </div>\
        <section class="py-16 bg-white">\
            <div class="container mx-auto px-6">\
                <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Featured Areas</h2>\
                <div class="grid md:grid-cols-3 gap-8">\
                    <div class="card">\
                        <img src="https://placehold.co/600x400/1A202C/FFFFFF?text=Metabolism" alt="Metabolism" class="w-full h-48 object-cover">\
                        <div class="card-content"><h3 class="card-title">Metabolism</h3><p class="card-text">Examine the complex network of chemical reactions that sustain life. From energy production to biomolecule synthesis...</p></div>\
                        <div class="card-actions"><a href="#blogs" data-page="blogs" class="mt-auto inline-block text-teal-500 hover:text-teal-600 font-semibold">Read on Blogs &rarr;</a></div>\
                    </div>\
                    <div class="card">\
                        <img src="https://placehold.co/600x400/0A192F/64FFDA?text=Genetics" alt="Genetics" class="w-full h-48 object-cover">\
                        <div class="card-content"><h3 class="card-title">Molecular Genetics</h3><p class="card-text">Discover the secrets of DNA, gene expression, and the molecular mechanisms of heredity.</p></div>\
                        <div class="card-actions"><a href="#blogs" data-page="blogs" class="mt-auto inline-block text-teal-500 hover:text-teal-600 font-semibold">Read on Blogs &rarr;</a></div>\
                    </div>\
                    <div class="card">\
                        <img src="https://placehold.co/600x400/334155/FFFFFF?text=Enzymology" alt="Enzymology" class="w-full h-48 object-cover">\
                        <div class="card-content"><h3 class="card-title">Enzymology</h3><p class="card-text">Learn about the structures, functions, and regulation of enzymes, the biological catalysts.</p></div>\
                        <div class="card-actions"><a href="#blogs" data-page="blogs" class="mt-auto inline-block text-teal-500 hover:text-teal-600 font-semibold">Read on Blogs &rarr;</a></div>\
                    </div>\
                </div>\
            </div>\
        </section>\
        <section class="py-16 bg-gray-100">\
            <div class="container mx-auto px-6 text-center">\
                 <h2 class="text-3xl font-bold text-gray-800 mb-6">Why Labdr.net?</h2>\
                 <p class="text-lg text-gray-700 max-w-2xl mx-auto">We aim to present the complexity of science in an understandable and engaging way. With the philosophy "Life itself is a laboratory," we transform learning into a journey of discovery by relating biochemistry to everyday life.</p>\
            </div>\
        </section>\
    `,\
    about_us: `\
        <div class="container mx-auto px-6 py-12 md:py-20">\
            <h1 class="text-4xl font-bold text-center text-gray-800 mb-6 motto-font">About Us</h1>\
            <div class="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">\
                <img src="https://placehold.co/800x400/0A192F/FFFFFF?text=Labdr.net+Team" alt="Labdr.net Philosophy" class="rounded-lg mb-6 w-full h-64 object-cover">\
                <h2 class="text-2xl font-semibold text-teal-600 mb-4">Our Philosophy: Life Itself is a Laboratory</h2>\
                <p class="text-gray-700 mb-4 leading-relaxed">At Labdr.net, we believe that biochemistry is not an abstract concept confined to textbooks or research labs. On the contrary, we see traces of biochemistry in every breath we take, every bite we eat, every emotion we feel, and every natural event happening around us. Our motto, "Life itself is a laboratory," reflects this fundamental belief.</p>\
                <p class="text-gray-700 mb-4 leading-relaxed">Our goal is to make this complex and fascinating branch of science accessible to everyone, to inspire curiosity, and to encourage the exploration of life's wonders at the molecular level. By sharing knowledge, questioning, and continuously learning, we can all become more conscious experimenters in this vast laboratory around us.</p>\
                <h2 class="text-2xl font-semibold text-teal-600 mt-8 mb-4">Our Mission</h2>\
                <p class="text-gray-700 mb-4 leading-relaxed">Labdr.net aims to present current information, fundamental concepts, and interesting research findings in the field of biochemistry in an understandable language. We strive to be a resource for students, researchers, educators, and anyone curious about science.</p>\
                <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">\
                    <li>To provide accurate and reliable information.</li>\
                    <li>To enhance understanding by simplifying complex topics.</li>\
                    <li>To make learning interactive and enjoyable.</li>\
                    <li>To encourage scientific thinking and inquiry.</li>\
                </ul>\
                 <p class="text-gray-700 leading-relaxed">Join us on this journey and become a part of the endless discoveries in the laboratory of life!</p>\
            </div>\
        </div>\
    `,\
    laboratory: `\
        <div class="container mx-auto px-6 py-12 md:py-20">\
            <h1 class="text-4xl font-bold text-center text-gray-800 mb-12 motto-font">Our Laboratory</h1>\
            <div class="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">\
                <img src="https://placehold.co/800x400/64FFDA/0A192F?text=Modern+Laboratory" alt="Our Laboratory" class="rounded-lg mb-6 w-full h-64 object-cover">\
                <h2 class="text-2xl font-semibold text-teal-600 mb-4">State-of-the-Art Facilities & Insights</h2>\
                <p class="text-gray-700 mb-4 leading-relaxed">Welcome to the Labdr.net virtual laboratory space. Here, we delve into the practical aspects of biochemistry, exploring cutting-edge techniques and research methodologies. Our focus is on providing insights into how biochemical knowledge is generated and applied.</p>\
                <p class="text-gray-700 mb-4 leading-relaxed">This section will feature:</p>\
                <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">\
                    <li>Virtual explorations of key laboratory instruments and their principles.</li>\
                    <li>Detailed explanations of common biochemical assays and experimental designs.</li>\
                    <li>Case studies of groundbreaking research and how it was conducted.</li>\
                    <li>Discussions on laboratory safety, ethics, and best practices in biochemical research.</li>\
                </ul>\
                <p class="text-gray-700 leading-relaxed">Content for this section is currently under development. Stay tuned as we build out this area to bring the dynamic world of the biochemistry lab to you.</p>\
            </div>\
        </div>\
    `,\
    nbc: `\
        <div class="container mx-auto px-6 py-12 md:py-20">\
            <h1 class="text-4xl font-bold text-center text-gray-800 mb-12 motto-font">NBC (Nuclear, Biological, Chemical)</h1>\
            <div class="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">\
                <img src="https://placehold.co/800x400/FFB74D/000000?text=NBC+Defense+Symbol" alt="NBC Section" class="rounded-lg mb-6 w-full h-64 object-cover">\
                <h2 class="text-2xl font-semibold text-teal-600 mb-4">Biochemical Perspectives on NBC</h2>\
                <p class="text-gray-700 mb-4 leading-relaxed">The study of Nuclear, Biological, and Chemical (NBC) agents, along with their detection and defense mechanisms, frequently intersects with the field of biochemistry. This section aims to provide an educational overview of:</p>\
                <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">\
                    <li>The biochemical nature and mechanisms of action of various biological and chemical agents.</li>\
                    <li>Biochemical pathways and cellular processes affected by NBC exposure.</li>\
                    <li>The crucial role of biochemistry in developing diagnostic tools, detection methods, and therapeutic countermeasures.</li>\
                    <li>Ethical considerations and dual-use research concerns in NBC-related biochemistry.</li>\
                </ul>\
                <p class="text-gray-700 mb-4 leading-relaxed">Content in this section will be carefully curated to be informative and educational, focusing on the underlying scientific principles. We aim to foster a deeper understanding and awareness of these critical topics.</p>\
                 <p class="text-gray-700 font-semibold leading-relaxed">Disclaimer: Information provided in this section is for educational purposes only and should not be interpreted as guidance for handling, responding to, or mitigating NBC incidents. Always refer to official governmental and expert sources for such information and procedures.</p>\
            </div>\
        </div>\
    `,\
    partners: `\
        <div class="container mx-auto px-6 py-12 md:py-20">\
            <h1 class="text-4xl font-bold text-center text-gray-800 mb-12 motto-font">Our Partners</h1>\
            <div class="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">\
                <img src="https://placehold.co/800x400/0A192F/FFFFFF?text=Collaboration+Network" alt="Our Partners" class="rounded-lg mb-6 w-full h-64 object-cover">\
                <h2 class="text-2xl font-semibold text-teal-600 mb-4">Collaboration & Support Network</h2>\
                <p class="text-gray-700 mb-4 leading-relaxed">At Labdr.net, we believe in the transformative power of collaboration to advance scientific understanding and effectively disseminate knowledge. We are proud to partner with a diverse range of institutions, organizations, and individuals who share our passion for biochemistry and science education.</p>\
                <p class="text-gray-700 mb-4 leading-relaxed">Our valued partners may include (examples):</p>\
                <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">\
                    <li>Academic Institutions & University Research Groups</li>\
                    <li>National and International Scientific Societies</li>\
                    <li>Non-profit Organizations focused on Science Outreach</li>\
                    <li>Educational Content Creators and Platforms</li>\
                    <li>Industry Leaders in Biotechnology and Pharmaceuticals</li>\
                </ul>\
                <p class="text-gray-700 leading-relaxed">We are always open to exploring new partnerships that align with our mission. This section will be updated to showcase our active collaborations.</p>\
            </div>\
        </div>\
    `,\
    blogs: `\
        <div class="container mx-auto px-6 py-12 md:py-20">\
            <h1 class="text-4xl font-bold text-center text-gray-800 mb-12 motto-font">Biochemistry Blogs</h1>\
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">\
                <div class="card">\
                    <img src="https://placehold.co/600x400/64FFDA/0A192F?text=Protein+Synthesis" alt="Protein Synthesis" class="w-full h-48 object-cover">\
                    <div class="card-content">\
                        <h3 class="card-title">The Steps of Protein Synthesis</h3>\
                        <p class="text-xs text-gray-500 mb-2">Publication Date: May 25, 2025</p>\
                        <p class="card-text">Learn step-by-step how proteins, the fundamental building blocks of cells, are synthesized...</p>\
                    </div>\
                    <div class="card-actions">\
                        <button class="btn btn-primary w-full mb-2" onclick="showModal('Protein Synthesis Details', 'The full content of this article will be added soon. Protein synthesis occurs in ribosomes where amino acids are assembled according to an mRNA template...')">Read More</button>\
                        <button class="btn btn-gemini w-full" onclick="handleExplainConcept('Protein Synthesis', 'Simply explain the basic steps and importance of protein synthesis.')">\uc0\u10024  Simplify Concept</button>\
                    </div>\
                </div>\
                <div class="card">\
                    <img src="https://placehold.co/600x400/FFB74D/000000?text=ATP+and+Energy" alt="ATP and Energy" class="w-full h-48 object-cover">\
                    <div class="card-content">\
                        <h3 class="card-title">ATP: The Cell's Energy Currency</h3>\
                        <p class="text-xs text-gray-500 mb-2">Publication Date: May 20, 2025</p>\
                        <p class="card-text">Discover the critical role of Adenosine Triphosphate (ATP) in cellular processes and how it facilitates energy transfer.</p>\
                    </div>\
                    <div class="card-actions">\
                        <button class="btn btn-primary w-full mb-2" onclick="showModal('ATP and Energy Details', 'The full content of this article will be added soon. ATP provides the necessary energy for metabolic reactions...')">Read More</button>\
                        <button class="btn btn-gemini w-full" onclick="handleExplainConcept('ATP and Energy', 'What is ATP and why is it so important for cells? Explain in simple language.')">\uc0\u10024  Simplify Concept</button>\
                    </div>\
                </div>\
                <div class="card">\
                    <img src="https://placehold.co/600x400/0A192F/FFFFFF?text=DNA+Replication" alt="DNA Replication" class="w-full h-48 object-cover">\
                     <div class="card-content">\
                        <h3 class="card-title">Mysteries of DNA Replication</h3>\
                        <p class="text-xs text-gray-500 mb-2">Publication Date: May 15, 2025</p>\
                        <p class="card-text">Examine the DNA replication mechanisms that ensure the transmission of hereditary information from generation to generation.</p>\
                    </div>\
                    <div class="card-actions">\
                        <button class="btn btn-primary w-full mb-2" onclick="showModal('DNA Replication Details', 'The full content of this article will be added soon. The DNA polymerase enzyme copies the DNA strand...')">Read More</button>\
                        <button class="btn btn-gemini w-full" onclick="handleExplainConcept('DNA Replication', 'How does DNA replication work and why is it necessary for life? Explain clearly.')">\uc0\u10024  Simplify Concept</button>\
                    </div>\
                </div>\
                 <div class="card">\
                    <img src="https://placehold.co/600x400/1A202C/64FFDA?text=Enzyme+Kinetics" alt="Enzyme Kinetics" class="w-full h-48 object-cover">\
                    <div class="card-content">\
                        <h3 class="card-title">Introduction to Enzyme Kinetics</h3>\
                        <p class="text-xs text-gray-500 mb-2">Publication Date: May 10, 2025</p>\
                        <p class="card-text">Understand how enzymes affect reaction rates and learn about Michaelis-Menten kinetics.</p>\
                    </div>\
                    <div class="card-actions">\
                        <button class="btn btn-primary w-full mb-2" onclick="showModal('Enzyme Kinetics Details', 'The full content of this article will be added soon. Enzyme kinetics plays a significant role in drug development...')">Read More</button>\
                        <button class="btn btn-gemini w-full" onclick="handleExplainConcept('Enzyme Kinetics', 'What does enzyme kinetics mean and why is it important in biochemistry? Explain its basic principles.')">\uc0\u10024  Simplify Concept</button>\
                    </div>\
                </div>\
            </div>\
        </div>\
    `\
\};\
\
// --- Page Loading and Navigation ---\
// This handles changing pages and updating the "active" link.\
function loadPage(pageKey) \{\
    const effectivePageKey = pages[pageKey] ? pageKey : 'home';\
    mainContent.innerHTML = pages[effectivePageKey];\
\
    [...navLinks, ...mobileNavLinks].forEach(link => \{\
        link.classList.toggle('nav-link-active', link.dataset.page === effectivePageKey);\
    \});\
\
    window.scrollTo(0, 0);\
    if (!mobileMenu.classList.contains('hidden')) \{\
        mobileMenu.classList.add('hidden');\
    \}\
\}\
\
// --- Event Handlers for Gemini Features ---\
// This needs to be available globally so the `onclick` in the HTML can find it.\
async function handleExplainConcept(conceptName, prompt) \{\
    const explanation = await callGeminiAPI(prompt);\
    showModal(`\uc0\u10024  $\{conceptName\} - Simplified Explanation`, explanation);\
\}\
window.handleExplainConcept = handleExplainConcept;\
\
\
// --- Initial Setup ---\
// Listen for clicks on links or buttons that should change the page.\
document.body.addEventListener('click', function(event) \{\
    const target = event.target.closest('[data-page]');\
    if (target && (target.classList.contains('nav-link') || target.classList.contains('btn') || target.classList.contains('motto-font'))) \{\
        event.preventDefault();\
        const page = target.dataset.page;\
        if (page && pages[page]) \{\
            loadPage(page);\
            history.pushState(\{ page: page \}, '', `#$\{page\}`);\
        \}\
    \}\
\});\
\
// Handle mobile menu toggle.\
mobileMenuButton.addEventListener('click', () => \{\
    mobileMenu.classList.toggle('hidden');\
\});\
\
// Set the current year in the footer.\
document.getElementById('currentYear').textContent = new Date().getFullYear();\
\
// Handle browser back/forward buttons.\
window.addEventListener('popstate', (event) => \{\
    const page = event.state ? event.state.page : (window.location.hash.substring(1) || 'home');\
    loadPage(pages[page] ? page : 'home');\
\});\
        \
// Load the initial page when the website first opens.\
const initialPageFromHash = window.location.hash.substring(1);\
let initialPage = 'home';\
if (initialPageFromHash && pages[initialPageFromHash]) \{\
    initialPage = initialPageFromHash;\
\}\
loadPage(initialPage);\
history.replaceState(\{page: initialPage\}, '', `#$\{initialPage\}`);}