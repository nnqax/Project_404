
        function openWindow(windowId) {
            document.getElementById(windowId).style.display = 'block';
            bringToFront(windowId);
        }

        function closeWindow(windowId) {
            document.getElementById(windowId).style.display = 'none';
        }

        function bringToFront(windowId) {
            const windows = document.querySelectorAll('.window');
            windows.forEach(window => {
                window.style.zIndex = '1';
            });
            document.getElementById(windowId).style.zIndex = '10';
        }

        function openTab(tabId) {
            // Hide all tabs in system window
            document.querySelectorAll('#system .content').forEach(tab => {
                tab.style.display = 'none';
            });
            // Show selected tab
            document.getElementById(tabId).style.display = 'block';

            // Update active tab
            document.querySelectorAll('#system .tabs h5').forEach(tab => {
                tab.classList.remove('active');
            });
            event.target.classList.add('active');
        }

        function openLearnTab(tabId) {
            // Hide all tabs in learn window
            document.querySelectorAll('#learn .content').forEach(tab => {
                tab.style.display = 'none';
            });
            // Show selected tab
            document.getElementById(tabId).style.display = 'block';

            // Update active tab
            document.querySelectorAll('#learn .tabs h5').forEach(tab => {
                tab.classList.remove('active');
            });
            event.target.classList.add('active');
        }

        function toggleFAQ(element) {
            const answer = element.nextElementSibling;
            const isOpen = answer.classList.contains('show');

            // Close all FAQ answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('show');
            });

            // Toggle all FAQ indicators
            document.querySelectorAll('.faq-question span').forEach(indicator => {
                indicator.textContent = '+';
            });

            // Open this FAQ if it was closed
            if (!isOpen) {
                answer.classList.add('show');
                element.querySelector('span').textContent = '-';
            }
        }

        function checkAnswer(button, correctAnswer) {
            const input = button.previousElementSibling;
            const feedback = button.nextElementSibling;
            const userAnswer = input.value.trim().toLowerCase();
            const correct = correctAnswer.toLowerCase();

            if (userAnswer === correct) {
                feedback.textContent = "Correct! Well done. You can proceed to the next section.";
                feedback.className = "feedback correct";
                feedback.style.display = 'block';
            } else {
                feedback.textContent = "Incorrect. Try again or review the material.";
                feedback.className = "feedback incorrect";
                feedback.style.display = 'block';
            }
        }

        function toggleStartMenu() {
            const startMenu = document.getElementById('startMenu');
            startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
        }

        // Close start menu when clicking outside
        document.addEventListener('click', function(event) {
            const startMenu = document.getElementById('startMenu');
            const startButton = document.querySelector('.start-menu');

            if (!startButton.contains(event.target) && !startMenu.contains(event.target)) {
                startMenu.style.display = 'none';
            }
        });

        // Update clock
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            document.getElementById('clock').textContent = timeString;
        }

        setInterval(updateClock, 1000);
        updateClock();

        // Make windows draggable
        document.querySelectorAll('.windownav').forEach(nav => {
            nav.addEventListener('mousedown', function(e) {
                const window = this.parentElement;
                let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;

                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;

                function elementDrag(e) {
                    e = e || window.event;
                    e.preventDefault();
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    window.style.top = (window.offsetTop - pos2) + "px";
                    window.style.left = (window.offsetLeft - pos1) + "px";
                }

                function closeDragElement() {
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
            });
        });

        // Open system window by default
        window.onload = function() {
            openWindow('system');
        };
