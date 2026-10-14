// SQLD 기출 풀이 웹앱 상태 및 로직
(function() {
  const STORAGE_KEY_ANSWERS = 'SQLD_USER_ANSWERS_V1';
  const STORAGE_KEY_STARS = 'SQLD_USER_STARS_V1';

  // State
  let allQuestions = window.SQLD_ROUND_QUESTIONS || [];
  let roundsList = window.SQLD_ROUNDS_LIST || [];
  
  let currentMode = 'ROUND'; // 'ROUND' | 'WRONG' | 'STARRED' | 'RANDOM'
  let currentRound = 45; // Start with round 45 or latest
  let currentSubject = 'ALL';
  let filteredQuestions = [];
  let currentIndex = 0;

  // LocalStorage persistance
  let userAnswers = {};
  try {
    userAnswers = JSON.parse(localStorage.getItem(STORAGE_KEY_ANSWERS)) || {};
  } catch (e) { userAnswers = {}; }

  let userStars = new Set();
  try {
    const savedStars = JSON.parse(localStorage.getItem(STORAGE_KEY_STARS)) || [];
    userStars = new Set(savedStars);
  } catch (e) { userStars = new Set(); }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(userAnswers));
      localStorage.setItem(STORAGE_KEY_STARS, JSON.stringify(Array.from(userStars)));
    } catch (e) {}
    updateOverallStats();
  }

  // DOM Elements
  const roundSelect = document.getElementById('round-select');
  const subjectFilter = document.getElementById('subject-filter');
  const btnModeAll = document.getElementById('btn-mode-all');
  const btnModeWrong = document.getElementById('btn-mode-wrong');
  const btnModeStarred = document.getElementById('btn-mode-starred');
  const btnModeRandom = document.getElementById('btn-mode-random');

  const qRoundBadge = document.getElementById('q-round-badge');
  const qSubjectBadge = document.getElementById('q-subject-badge');
  const qNumberBadge = document.getElementById('q-number-badge');
  const btnBookmark = document.getElementById('btn-bookmark');
  const qTitle = document.getElementById('q-title');
  const qReferenceBox = document.getElementById('q-reference-box');
  const optionsContainer = document.getElementById('options-container');

  const solutionPanel = document.getElementById('solution-panel');
  const solutionHeader = document.getElementById('solution-header');
  const resultBadge = document.getElementById('result-badge');
  const correctAnsNum = document.getElementById('correct-ans-num');
  const qExplanation = document.getElementById('q-explanation');
  
  const conceptNoteBox = document.getElementById('concept-note-box');
  const conceptTitle = document.getElementById('concept-title');
  const conceptRef = document.getElementById('concept-ref');
  const conceptSummary = document.getElementById('concept-summary');

  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const qProgressText = document.getElementById('q-progress-text');
  const btnResetCurrent = document.getElementById('btn-reset-current');
  const numberGrid = document.getElementById('number-grid');
  const gridStatusCount = document.getElementById('grid-status-count');
  const btnClearRound = document.getElementById('btn-clear-round-records');

  const statSolved = document.getElementById('stat-solved');
  const statRate = document.getElementById('stat-rate');
  const statWrong = document.getElementById('stat-wrong');
  const statBookmark = document.getElementById('stat-bookmark');

  // Init Dropdown
  function initDropdown() {
    roundSelect.innerHTML = '';
    // Ascending: 45 to 62
    const sortedRounds = [...roundsList].sort((a, b) => a.id - b.id);
    sortedRounds.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.id;
      opt.textContent = `${r.label}`;
      roundSelect.appendChild(opt);
    });
    roundSelect.value = currentRound;
  }

  // Filter Questions based on mode & dropdowns
  function applyFilters() {
    if (currentMode === 'ROUND') {
      filteredQuestions = allQuestions.filter(q => q.round === currentRound);
      if (currentSubject !== 'ALL') {
        filteredQuestions = filteredQuestions.filter(q => q.subject === currentSubject);
      }
    } else if (currentMode === 'WRONG') {
      // Questions that user answered incorrectly
      const wrongIds = new Set(
        Object.entries(userAnswers)
          .filter(([_, ans]) => ans.isCorrect === false)
          .map(([id]) => Number(id))
      );
      filteredQuestions = allQuestions.filter(q => wrongIds.has(q.id));
    } else if (currentMode === 'STARRED') {
      // Questions user bookmarked
      filteredQuestions = allQuestions.filter(q => userStars.has(q.id));
    } else if (currentMode === 'RANDOM') {
      // Pick 50 random questions
      const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
      filteredQuestions = shuffled.slice(0, 50);
    }

    currentIndex = 0;
    renderCurrentQuestion();
    renderNumberGrid();
    updateOverallStats();
  }

  // Render question references (SQL code, Table, Passage)
  function renderReferences(refs) {
    if (!refs || refs.length === 0) {
      qReferenceBox.classList.add('hidden');
      qReferenceBox.innerHTML = '';
      return;
    }

    qReferenceBox.classList.remove('hidden');
    qReferenceBox.innerHTML = '';

    refs.forEach(r => {
      const section = document.createElement('div');
      section.className = 'ref-section';

      if (r.type === 'sql') {
        const label = document.createElement('span');
        label.className = 'ref-label';
        label.textContent = '[SQL 쿼리/DDL]';
        const pre = document.createElement('pre');
        pre.className = 'sql-code-block';
        pre.textContent = r.code;
        section.appendChild(label);
        section.appendChild(pre);
      } else if (r.type === 'table') {
        const label = document.createElement('span');
        label.className = 'ref-label';
        label.textContent = r.caption ? `[테이블: ${r.caption}]` : '[테이블 데이터]';
        section.appendChild(label);

        const table = document.createElement('table');
        table.className = 'rendered-table';
        if (r.headers && r.headers.length > 0) {
          const thead = document.createElement('thead');
          const tr = document.createElement('tr');
          r.headers.forEach(h => {
            const th = document.createElement('th');
            th.textContent = h;
            tr.appendChild(th);
          });
          thead.appendChild(tr);
          table.appendChild(thead);
        }
        if (r.rows && r.rows.length > 0) {
          const tbody = document.createElement('tbody');
          r.rows.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
              const td = document.createElement('td');
              td.textContent = cell;
              tr.appendChild(td);
            });
            tbody.appendChild(tr);
          });
          table.appendChild(tbody);
        }
        section.appendChild(table);
      } else if (r.type === 'ascii' || r.type === 'erd') {
        const label = document.createElement('span');
        label.className = 'ref-label';
        label.textContent = r.caption ? `[다이어그램: ${r.caption}]` : '[다이어그램]';
        const pre = document.createElement('pre');
        pre.className = 'sql-code-block';
        pre.textContent = r.text || r.mermaid;
        section.appendChild(label);
        section.appendChild(pre);
      } else if (r.type === 'text') {
        const p = document.createElement('div');
        p.className = 'passage-text';
        p.textContent = r.content;
        section.appendChild(p);
      }
      qReferenceBox.appendChild(section);
    });
  }

  // Render current question
  function renderCurrentQuestion() {
    if (filteredQuestions.length === 0) {
      qRoundBadge.textContent = '-';
      qSubjectBadge.textContent = '-';
      qNumberBadge.textContent = '-';
      qTitle.textContent = currentMode === 'WRONG' 
        ? '현재 오답노트에 담긴 문제가 없습니다! 풀면서 틀린 문제가 자동으로 여기에 모입니다.'
        : currentMode === 'STARRED'
        ? '현재 헷갈림(별표) 표시한 문제가 없습니다!'
        : '해당 조건의 문제가 없습니다.';
      qReferenceBox.classList.add('hidden');
      optionsContainer.innerHTML = '';
      solutionPanel.classList.add('hidden');
      qProgressText.textContent = '0 / 0';
      return;
    }

    const q = filteredQuestions[currentIndex];
    qRoundBadge.textContent = q.examLabel || `제${q.round}회`;
    qSubjectBadge.textContent = q.subject || '과목';
    qNumberBadge.textContent = `${q.number || (currentIndex + 1)}번`;
    qTitle.textContent = q.title;

    // Star icon status
    if (userStars.has(q.id)) {
      btnBookmark.classList.add('active');
      btnBookmark.querySelector('.star-icon').textContent = '★';
    } else {
      btnBookmark.classList.remove('active');
      btnBookmark.querySelector('.star-icon').textContent = '☆';
    }

    // References
    renderReferences(q.references);

    // Options
    optionsContainer.innerHTML = '';
    const answerInfo = userAnswers[q.id];

    q.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.dataset.index = idx;

      const numSpan = document.createElement('span');
      numSpan.className = 'option-num';
      numSpan.textContent = idx + 1;

      const textSpan = document.createElement('span');
      textSpan.className = 'option-text';
      textSpan.textContent = optText;

      btn.appendChild(numSpan);
      btn.appendChild(textSpan);

      // If already answered
      if (answerInfo) {
        if (idx === q.correctIndex) {
          btn.classList.add('reveal-correct');
        }
        if (idx === answerInfo.selectedIndex) {
          if (answerInfo.isCorrect) {
            btn.classList.add('selected-correct');
          } else {
            btn.classList.add('selected-wrong');
          }
        }
      }

      btn.addEventListener('click', () => handleOptionClick(q, idx));
      optionsContainer.appendChild(btn);
    });

    // Solution panel
    if (answerInfo) {
      showSolutionPanel(q, answerInfo);
    } else {
      solutionPanel.classList.add('hidden');
    }

    // Progress text
    qProgressText.textContent = `${currentIndex + 1} / ${filteredQuestions.length}`;
    updateGridHighlight();
  }

  // Handle Option Click
  function handleOptionClick(q, selectedIdx) {
    const isCorrect = selectedIdx === q.correctIndex;
    userAnswers[q.id] = {
      selectedIndex: selectedIdx,
      isCorrect: isCorrect,
      answeredAt: new Date().toISOString()
    };
    saveState();

    // Re-render to reflect feedback
    renderCurrentQuestion();
    renderNumberGrid();
  }

  // Show Solution Panel
  function showSolutionPanel(q, answerInfo) {
    solutionPanel.classList.remove('hidden');

    if (answerInfo.isCorrect) {
      resultBadge.className = 'result-badge correct';
      resultBadge.textContent = '정답입니다! 🎉';
    } else {
      resultBadge.className = 'result-badge wrong';
      resultBadge.textContent = '아쉽네요, 오답입니다! ❌';
    }

    correctAnsNum.textContent = `${q.correctIndex + 1}번`;
    qExplanation.textContent = q.explanation || '해설이 없습니다.';

    // Concept note
    if (q.conceptNote) {
      conceptNoteBox.classList.remove('hidden');
      conceptTitle.textContent = `${q.conceptNote.keyword}`;
      conceptRef.textContent = q.conceptNote.pageRef || '2024 개정 교재';
      conceptSummary.textContent = q.conceptNote.summary;
    } else {
      conceptNoteBox.classList.add('hidden');
    }
  }

  // Render Number Grid in Sidebar
  function renderNumberGrid() {
    numberGrid.innerHTML = '';
    let solvedInSet = 0;

    filteredQuestions.forEach((q, idx) => {
      const btn = document.createElement('button');
      btn.className = 'grid-btn';
      btn.textContent = q.number || (idx + 1);

      const ans = userAnswers[q.id];
      if (ans) {
        solvedInSet++;
        if (ans.isCorrect) {
          btn.classList.add('correct');
        } else {
          btn.classList.add('wrong');
        }
      }

      if (userStars.has(q.id)) {
        btn.classList.add('starred');
      }

      if (idx === currentIndex) {
        btn.classList.add('current');
      }

      btn.addEventListener('click', () => {
        currentIndex = idx;
        renderCurrentQuestion();
      });

      numberGrid.appendChild(btn);
    });

    gridStatusCount.textContent = `${solvedInSet}/${filteredQuestions.length} 완료`;
  }

  function updateGridHighlight() {
    const buttons = numberGrid.querySelectorAll('.grid-btn');
    buttons.forEach((b, idx) => {
      if (idx === currentIndex) {
        b.classList.add('current');
      } else {
        b.classList.remove('current');
      }
    });
  }

  // Update Overall Header Stats
  function updateOverallStats() {
    const totalAnswered = Object.keys(userAnswers).length;
    const correctCount = Object.values(userAnswers).filter(a => a.isCorrect).length;
    const wrongCount = Object.values(userAnswers).filter(a => a.isCorrect === false).length;
    const starCount = userStars.size;

    statSolved.textContent = totalAnswered;
    statWrong.textContent = wrongCount;
    statBookmark.textContent = starCount;

    const rate = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    statRate.textContent = `${rate}%`;
  }

  // Event Listeners
  roundSelect.addEventListener('change', (e) => {
    currentRound = Number(e.target.value);
    currentMode = 'ROUND';
    setActiveModeButton(btnModeAll);
    applyFilters();
  });

  subjectFilter.addEventListener('change', (e) => {
    currentSubject = e.target.value;
    applyFilters();
  });

  function setActiveModeButton(btn) {
    [btnModeAll, btnModeWrong, btnModeStarred, btnModeRandom].forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  btnModeAll.addEventListener('click', () => {
    currentMode = 'ROUND';
    setActiveModeButton(btnModeAll);
    roundSelect.disabled = false;
    subjectFilter.disabled = false;
    applyFilters();
  });

  btnModeWrong.addEventListener('click', () => {
    currentMode = 'WRONG';
    setActiveModeButton(btnModeWrong);
    roundSelect.disabled = true;
    subjectFilter.disabled = true;
    applyFilters();
  });

  btnModeStarred.addEventListener('click', () => {
    currentMode = 'STARRED';
    setActiveModeButton(btnModeStarred);
    roundSelect.disabled = true;
    subjectFilter.disabled = true;
    applyFilters();
  });

  btnModeRandom.addEventListener('click', () => {
    currentMode = 'RANDOM';
    setActiveModeButton(btnModeRandom);
    roundSelect.disabled = true;
    subjectFilter.disabled = true;
    applyFilters();
  });

  document.getElementById('btn-show-wrong').addEventListener('click', () => {
    btnModeWrong.click();
  });

  document.getElementById('btn-show-bookmark').addEventListener('click', () => {
    btnModeStarred.click();
  });

  // Bookmark toggle
  btnBookmark.addEventListener('click', () => {
    if (filteredQuestions.length === 0) return;
    const q = filteredQuestions[currentIndex];
    if (userStars.has(q.id)) {
      userStars.delete(q.id);
    } else {
      userStars.add(q.id);
    }
    saveState();
    renderCurrentQuestion();
    renderNumberGrid();
  });

  // Reset current question
  btnResetCurrent.addEventListener('click', () => {
    if (filteredQuestions.length === 0) return;
    const q = filteredQuestions[currentIndex];
    delete userAnswers[q.id];
    saveState();
    renderCurrentQuestion();
    renderNumberGrid();
  });

  // Clear all records for current round
  btnClearRound.addEventListener('click', () => {
    if (!confirm('현재 보고 있는 회차의 문제 풀이 기록을 초기화하시겠습니까?')) return;
    filteredQuestions.forEach(q => {
      delete userAnswers[q.id];
    });
    saveState();
    renderCurrentQuestion();
    renderNumberGrid();
  });

  // Prev / Next
  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderCurrentQuestion();
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentIndex < filteredQuestions.length - 1) {
      currentIndex++;
      renderCurrentQuestion();
    }
  });

  // Keyboard Shortcuts (1, 2, 3, 4, Enter, Space, Arrows)
  window.addEventListener('keydown', (e) => {
    if (filteredQuestions.length === 0) return;
    const q = filteredQuestions[currentIndex];

    if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
      const idx = Number(e.key) - 1;
      if (idx < q.options.length) {
        handleOptionClick(q, idx);
      }
    } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
      if (currentIndex < filteredQuestions.length - 1) {
        currentIndex++;
        renderCurrentQuestion();
      }
    } else if (e.key === 'ArrowLeft') {
      if (currentIndex > 0) {
        currentIndex--;
        renderCurrentQuestion();
      }
    }
  });

  // ==========================================
  // 📘 Theory Viewer Logic (2024 핵심 이론집)
  // ==========================================
  const tabBtnQuiz = document.getElementById('tab-btn-quiz');
  const tabBtnTheory = document.getElementById('tab-btn-theory');
  const viewQuiz = document.getElementById('view-quiz');
  const viewTheory = document.getElementById('view-theory');
  const theorySearch = document.getElementById('theory-search');
  const theoryFilterPills = document.querySelectorAll('.filter-pill');
  const theoryContainer = document.getElementById('theory-container');

  let currentTheorySubject = 'ALL';
  let theorySearchQuery = '';

  function switchTab(target) {
    if (target === 'quiz') {
      tabBtnQuiz.classList.add('active');
      tabBtnTheory.classList.remove('active');
      viewQuiz.classList.add('active');
      viewTheory.classList.remove('active');
    } else {
      tabBtnQuiz.classList.remove('active');
      tabBtnTheory.classList.add('active');
      viewQuiz.classList.remove('active');
      viewTheory.classList.add('active');
      renderTheoryCards();
    }
  }

  tabBtnQuiz.addEventListener('click', () => switchTab('quiz'));
  tabBtnTheory.addEventListener('click', () => switchTab('theory'));

  // Simple Markdown text formatter for theory body
  function formatMarkdownText(text) {
    if (!text) return '';
    return text
      .trim()
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code style="background:#f1f5f9;color:#0f172a;padding:2px 6px;border-radius:4px;font-family:var(--font-mono);">$1</code>');
  }

  function renderTheoryCards() {
    const theoryData = window.SQLD_THEORY_DATA || [];
    theoryContainer.innerHTML = '';

    const query = theorySearchQuery.toLowerCase().trim();

    theoryData.forEach(chapterGroup => {
      // Filter by subject pill
      if (currentTheorySubject !== 'ALL' && chapterGroup.subject !== currentTheorySubject) {
        return;
      }

      // Filter sections in this chapter
      const matchingSections = chapterGroup.sections.filter(sec => {
        if (!query) return true;
        const inTitle = sec.title.toLowerCase().includes(query);
        const inContent = sec.content.toLowerCase().includes(query);
        const inKeywords = (sec.keywords || []).some(k => k.toLowerCase().includes(query));
        return inTitle || inContent || inKeywords;
      });

      if (matchingSections.length === 0) return;

      const block = document.createElement('div');
      block.className = 'theory-chapter-block';

      const heading = document.createElement('h2');
      heading.className = 'chapter-heading';
      heading.textContent = `${chapterGroup.subjectTitle} ➔ ${chapterGroup.chapterTitle}`;
      block.appendChild(heading);

      matchingSections.forEach(sec => {
        const card = document.createElement('article');
        card.className = 'theory-card';

        // Header
        const header = document.createElement('div');
        header.className = 'theory-card-header';
        
        const title = document.createElement('h3');
        title.className = 'theory-card-title';
        title.textContent = sec.title;

        const meta = document.createElement('div');
        meta.className = 'theory-card-meta';
        const pageBadge = document.createElement('span');
        pageBadge.className = 'theory-page-badge';
        pageBadge.textContent = sec.page;
        meta.appendChild(pageBadge);

        header.appendChild(title);
        header.appendChild(meta);
        card.appendChild(header);

        // Body
        const body = document.createElement('div');
        body.className = 'theory-body';
        body.innerHTML = formatMarkdownText(sec.content);
        card.appendChild(body);

        // Comparison Table (if exists)
        if (sec.compareTable) {
          const tableWrap = document.createElement('div');
          tableWrap.className = 'theory-table-wrapper';
          const table = document.createElement('table');
          table.className = 'theory-table';

          // thead
          const thead = document.createElement('thead');
          const trH = document.createElement('tr');
          sec.compareTable.headers.forEach(h => {
            const th = document.createElement('th');
            th.textContent = h;
            trH.appendChild(th);
          });
          thead.appendChild(trH);
          table.appendChild(thead);

          // tbody
          const tbody = document.createElement('tbody');
          sec.compareTable.rows.forEach(r => {
            const tr = document.createElement('tr');
            r.forEach(c => {
              const td = document.createElement('td');
              td.innerHTML = formatMarkdownText(c);
              tr.appendChild(td);
            });
            tbody.appendChild(tr);
          });
          table.appendChild(tbody);
          tableWrap.appendChild(table);
          card.appendChild(tableWrap);
        }

        // Footer action: Jump to quiz for this topic
        const footer = document.createElement('div');
        footer.className = 'theory-card-footer';
        const jumpBtn = document.createElement('button');
        jumpBtn.className = 'btn-jump-to-quiz';
        jumpBtn.innerHTML = `<span>✏️</span> <strong>${sec.targetSubject} 기출문제 바로 풀기</strong> ➔`;
        jumpBtn.addEventListener('click', () => {
          // Switch to Quiz tab
          switchTab('quiz');
          // Filter by that subject
          subjectFilter.value = sec.targetSubject;
          currentSubject = sec.targetSubject;
          currentMode = 'ROUND';
          setActiveModeButton(btnModeAll);
          applyFilters();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        footer.appendChild(jumpBtn);
        card.appendChild(footer);

        block.appendChild(card);
      });

      theoryContainer.appendChild(block);
    });

    if (theoryContainer.children.length === 0) {
      theoryContainer.innerHTML = `
        <div style="text-align:center;padding:48px 20px;background:#fff;border-radius:12px;border:1px dashed #cbd5e1;color:#64748b;">
          <h3>검색 결과가 없습니다 🔍</h3>
          <p style="margin-top:8px;font-size:0.9rem;">'${theorySearchQuery}'와(과) 일치하는 이론 내용이 없습니다. 다른 키워드로 검색해 보세요.</p>
        </div>
      `;
    }
  }

  theorySearch.addEventListener('input', (e) => {
    theorySearchQuery = e.target.value;
    renderTheoryCards();
  });

  theoryFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      theoryFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentTheorySubject = pill.dataset.filter;
      renderTheoryCards();
    });
  });

  // Start app
  initDropdown();
  applyFilters();
  renderTheoryCards();
})();
