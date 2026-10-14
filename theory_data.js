// 2024 개정판 SQLD 개념정리 요약본 103페이지 전 범위 완벽 수록 데이터
window.SQLD_THEORY_DATA = [
  // ==========================================
  // [제1과목] 1장. 데이터 모델링의 이해 (p.2 ~ p.14)
  // ==========================================
  {
    subject: "1과목",
    subjectTitle: "제1과목: 데이터 모델링의 이해",
    chapter: "1장",
    chapterTitle: "제1장. 데이터 모델의 이해",
    sections: [
      {
        id: "m1-1",
        title: "1. 모델링의 정의 및 3대 특징 (추상화·단순화·명확화)",
        page: "교재 p.2",
        keywords: ["추상화", "단순화", "명확화", "모델링관점"],
        content: `
- **모델링의 정의**: 복잡한 현실세계를 일정한 표기법에 맞춰 추상화·단순화·명확화하여 DB로 구축하기 위한 분석/설계 과정.
- **모델링의 3대 특징 (★단골 출제)**:
  1. **추상화(Abstraction)**: 현실세계를 일정한 형식에 맞춰 간략하게 표현.
  2. **단순화(Simplification)**: 약속된 규약/언어로 누구나 알기 쉽게 제한된 표기법으로 표현.
  3. **명확화(Clarity)**: 애매모호함을 제거하고 현상을 정확하게 기술. (구체화 X, 복잡화 X)
- **모델링의 3가지 관점**:
  - **데이터 관점 (What)**: 어떤 데이터가 필요한가? 업무와 데이터, 데이터 간의 관계.
  - **프로세스 관점 (How)**: 어떤 순서로 업무가 진행되는가? 업무가 실제 하고 있는 일.
  - **데이터와 프로세스의 상관관점 (Interaction)**: 업무 처리에 따라 데이터가 어떤 영향을 받는가? (CRUD 분석)`,
        compareTable: null,
        targetSubject: "1과목"
      },
      {
        id: "m1-2",
        title: "2. 데이터 모델링의 중요성 & 3대 유의점 (중복·비유연성·비일관성)",
        page: "교재 p.2",
        keywords: ["중복", "비유연성", "비일관성", "모델링유의점"],
        content: `
- **데이터 모델링의 중요성**: 파급효과(Leverage), 간결한 표현(Conciseness), 데이터 품질(Data Quality) 유지.
- **데이터 모델링의 3대 유의점 (★오답 함정 1순위)**:
  1. **중복(Duplication) 방지**: 여러 장소의 DB에 동일 정보를 중복 저장하지 않도록 설계.
  2. **비유연성(Inflexibility) 방지**: 데이터 정의를 데이터 사용 프로세스와 분리하여, 사소한 업무 변화에 모델이 수시로 변경되지 않도록 설계.
  3. **비일관성(Inconsistency) 방지**: 데이터 간 상호 연관 관계를 명확히 정의 (데이터 중복이 없더라도 연관 관계가 모호하면 데이터 갱신 시 불일치 발생).
  *(※ 주의: '성능 향상을 위해 초기 설계 단계부터 반정규화를 적극 수행한다'는 유의점이 아니라 오답 함정! 반정규화는 물리 설계 단계에서 최후의 수단으로 검토)*`,
        compareTable: null,
        targetSubject: "1과목"
      },
      {
        id: "m1-3",
        title: "3. 데이터 모델링의 3단계 (개념적·논리적·물리적)",
        page: "교재 p.2",
        keywords: ["개념적모델링", "논리적모델링", "물리적모델링", "추상화수준"],
        content: `
- 데이터 모델링은 **추상화 수준이 높은 곳에서 낮은 곳으로** (개념 ➔ 논리 ➔ 물리) 순차적으로 진행된다.`,
        compareTable: {
          headers: ["구분", "개념적 모델링 (Conceptual)", "논리적 모델링 (Logical)", "물리적 모델링 (Physical)"],
          rows: [
            ["관점", "업무 중심, 포괄적 수준", "시스템 설계 중심, 구체화", "실제 구현 중심, 하드웨어/DBMS 고려"],
            ["주요 작업", "전사적 핵심 Entity 도출, ERD 도출", "속성, 식별자, 관계 정의, **정규화 수행**, M:N 해소", "테이블스페이스, 인덱스, 물리 스토리지, 반정규화"],
            ["추상화 수준", "**가장 높음 (최상)**", "중간", "**가장 낮음 (최하)**"],
            ["특징", "사용자와 개발자 간의 의사소통 도구", "재사용성이 가장 높은 모델링 단계", "특정 DBMS(Oracle, MySQL 등)의 성능 특성에 맞춤"]
          ]
        },
        targetSubject: "1과목"
      },
      {
        id: "m1-4",
        title: "4. 데이터베이스 3단계 구조 & 2대 독립성 (ANSI-SPARC)",
        page: "교재 p.3",
        keywords: ["외부스키마", "개념스키마", "내부스키마", "논리적독립성", "물리적독립성", "사상"],
        content: `
- **스키마(Schema)의 정의**: 데이터베이스의 구조, 데이터 타입, 제약조건에 대한 명세(청사진).
- **ANSI-SPARC 3단계 구조**:
  - **외부 스키마 (External)**: 사용자 개개인 / 개발자 관점 (View). 업무 관점에 따라 여러 개 존재.
  - **개념 스키마 (Conceptual)**: 모든 사용자 관점을 **통합한 조직 전체 관점의 단 하나뿐인 DB 구조**.
  - **내부 스키마 (Internal)**: 물리적 저장 장치 관점 (데이터가 디스크에 실제로 저장되는 포맷, 인덱스).
- **데이터 독립성 보장을 위한 2단계 사상(Mapping)**:`,
        compareTable: {
          headers: ["독립성 종류", "사상 (Mapping)", "보장되는 효과 및 의미"],
          rows: [
            ["논리적 데이터 독립성", "외부 스키마 ↔ 개념 스키마 사상", "개념 스키마가 변경(테이블/속성 추가 등)되어도 외부 스키마(응용 프로그램)는 변경할 필요 없음"],
            ["물리적 데이터 독립성", "개념 스키마 ↔ 내부 스키마 사상", "내부 스키마(디스크 추가, 인덱스 재구성)가 바뀌어도 개념 스키마 및 응용 프로그램에 영향 없음"]
          ]
        },
        targetSubject: "1과목"
      },
      {
        id: "m1-5",
        title: "5. 엔터티(Entity) & 속성(Attribute) & 도메인(Domain)",
        page: "교재 p.5~8",
        keywords: ["엔터티", "인스턴스", "기본속성", "설계속성", "파생속성", "도메인"],
        content: `
- **엔터티의 성립 조건**:
  1. 업무에서 반드시 필요하고 관리하고자 하는 정보의 집합.
  2. 유일한 식별자(PK)에 의해 식별 가능해야 함.
  3. 반드시 **2개 이상의 인스턴스(행)**와 **2개 이상의 속성(컬럼)**으로 구성되어야 함.
  4. 업무 프로세스에 의해 반드시 이용되어야 함 (고립된 엔터티는 잘못된 모델).
- **속성의 분류 (★출제 단골)**:
  - **기본 속성(Basic)**: 업무로부터 자연스럽게 도출된 원래 속성 (예: 사원명, 주민번호, 입사일자).
  - **설계 속성(Designed)**: 업무에는 원래 없었으나 설계 편의상 인위적으로 부여한 속성 (예: 사원번호, 계좌코드, 상태구분코드).
  - **파생 속성(Derived)**: 다른 속성들의 계산/가공에 의해 새로 생성된 속성 (예: 이자, 총점, 평균, 할인금액, 결제잔액).
- **도메인(Domain)**: 속성이 가질 수 있는 값의 범위 (데이터 타입, 길이, 허용 값 범위, Check 제약조건).`,
        compareTable: null,
        targetSubject: "1과목"
      },
      {
        id: "m1-6",
        title: "6. 관계(Relationship) 표기법 & 바커 표기법 vs IE 표기법",
        page: "교재 p.8~9",
        keywords: ["관계", "카디널리티", "선택성", "바커표기법", "IE표기법"],
        content: `
- **관계의 구성 3요소**: 관계명(Membership), 관계차수(Cardinality: 1:1, 1:N, N:M), 선택성(Optionality: 필수/선택).
- **관계의 분류**:
  - **존재 관계**: 부모 엔터티의 존재에 종속적인 관계 (예: 사원 ➔ 소속부서).
  - **행위 관계**: 사원의 업무 행동에 의해 지속적으로 발생하는 관계 (예: 고객 ➔ 주문).
- **표기법 비교**:
  - **IE 표기법 (Information Engineering)**: 필수 참여는 실선 + 수직선(\`|\`), 선택 참여는 동그라미(\`O\`), 다수(Many)는 까마귀발(\`<\`).
  - **바커 표기법 (Barker)**: 필수 참여는 실선, 선택 참여는 점선, 다수는 까마귀발.`,
        compareTable: null,
        targetSubject: "1과목"
      },
      {
        id: "m1-7",
        title: "7. 식별자의 분류 & 식별자 관계 vs 비식별자 관계 (★무조건 출제)",
        page: "교재 p.10~13",
        keywords: ["주식별자", "보조식별자", "식별자관계", "비식별자관계", "실선", "점선"],
        content: `
- **주식별자의 4대 특징**:
  1. **유일성**: 엔터티 내 모든 인스턴스를 유일하게 구별할 수 있어야 함.
  2. **최소성**: 유일성을 만족하는 최소한의 속성으로만 구성되어야 함.
  3. **대표성**: 엔터티를 대표하여 업무적으로 자주 참조되는 식별자여야 함.
  4. **불변성**: 한번 지정되면 값이 자주 변하지 않아야 함. (변하면 연쇄 수정 유발)
- **식별자의 분류**:
  - 대표성 여부: **주식별자(Primary)** vs **보조식별자(Alternate)**
  - 생성 여부: **내부식별자(스스로 생성)** vs **외부식별자(FK, 타 엔터티에서 상속)**
  - 속성 수: **단일식별자(1개 컬럼)** vs **복합식별자(2개 이상 컬럼)**
  - 대체 여부: **본질식별자(업무적 원조)** vs **인조식별자(일련번호, 순번 등으로 대체)**`,
        compareTable: {
          headers: ["비교 항목", "식별자 관계 (Identifying Relationship)", "비식별자 관계 (Non-identifying Relationship)"],
          rows: [
            ["표기법", "실선 (──────)", "점선 (- - - - -)"],
            ["자식 테이블 상속", "부모의 PK가 자식의 **주식별자(PK)**로 전이", "부모의 PK가 자식의 **일반 속성(FK)**으로 전이"],
            ["자식 인스턴스 존재", "부모가 반드시 있어야 자식 존재 가능 (강한 결합)", "부모 없이도 자식 존재 가능 (약한 결합)"],
            ["조인 성능", "조인 경로가 단순해짐 (상위 부모 PK를 직접 보유)", "조인이 복잡해지거나 부모를 거쳐야 함"],
            ["단점", "상속이 깊어질수록 자식의 PK 컬럼 수가 계속 누적 증가", "자식 테이블 조회 시 부모 조인 필요 가능성"]
          ]
        },
        targetSubject: "1과목"
      }
    ]
  },

  // ==========================================
  // [제1과목] 2장. 데이터 모델과 성능 (p.15 ~ p.24)
  // ==========================================
  {
    subject: "1과목",
    subjectTitle: "제1과목: 데이터 모델링의 이해",
    chapter: "2장",
    chapterTitle: "제2장. 데이터 모델과 성능",
    sections: [
      {
        id: "m2-1",
        title: "1. 정규화(Normalization) 단계별 핵심 공식 (★필수 암기)",
        page: "교재 p.16~20",
        keywords: ["1정규화", "2정규화", "3정규화", "BCNF", "함수종속성", "원자성"],
        content: `
- **정규화의 목적**: 중복 데이터 최소화, 데이터 삽입/삭제/갱신 시 발생하는 **이상 현상(Anomaly)** 제거.`,
        compareTable: {
          headers: ["정규화 단계", "해결 대상 / 제거 조건", "핵심 암기 키워드 및 예시"],
          rows: [
            ["제1정규형 (1NF)", "원자성(Atomicity) 확보", "**반복 속성 / 다중값 분리** (한 컬럼에 값이 2개 이상 들어있지 않게)"],
            ["제2정규형 (2NF)", "부분 함수 종속성 제거", "**완전 함수 종속화** (복합키 {학번, 과목번호} 중 일부인 학번에만 종속되는 '학생이름' 분리)"],
            ["제3정규형 (3NF)", "이행적 함수 종속성 제거", "**A ➔ B, B ➔ C 에서 C 분리** (PK가 아닌 일반속성 '부서코드'가 '부서명'을 결정할 때 분리)"],
            ["BCNF", "결정자이면서 후보키가 아닌 것 분리", "**모든 결정자가 후보키**여야 함"]
          ]
        },
        targetSubject: "1과목"
      },
      {
        id: "m2-2",
        title: "2. 반정규화(Denormalization) 기법 및 절차",
        page: "교재 p.21~25",
        keywords: ["반정규화", "역정규화", "테이블병합", "테이블분할", "중복컬럼"],
        content: `
- **반정규화의 정의**: 시스템 성능 향상(조회 속도)을 위해 의도적으로 정규화 원칙을 위배하여 데이터를 중복, 통합, 분리하는 기법.
- **반정규화의 장단점**:
  - 장점: 조인 횟수 감소, 디스크 I/O 감소, 조회(SELECT) 쿼리 단순화 및 속도 향상.
  - 단점: 데이터 중복으로 인한 저장공간 낭비, **데이터 무결성 깨질 위험**, 입력/수정/삭제 속도 저하.
- **반정규화 대상 선정 기법**:
  1. **테이블 병합**: 1:1 관계 병합, 1:N 관계 병합, 슈퍼/서브타입 병합 (One-To-One, Plus, Single Type).
  2. **테이블 분할**: 수직 분할(자주 쓰는 컬럼과 안 쓰는 컬럼 분리), 수평 분할(파티셔닝, 행 분할).
  3. **중복 컬럼 추가**: 조인을 방지하기 위해 자주 함께 조회되는 부모의 컬럼을 자식 테이블에 복사.
  4. **파생 컬럼 추가**: 계산 부하를 줄이기 위해 총점, 평균, 누적합 등을 미리 컬럼으로 저장.`,
        compareTable: null,
        targetSubject: "1과목"
      },
      {
        id: "m2-3",
        title: "3. 트랜잭션의 4대 특징 (ACID) & NULL 속성의 이해",
        page: "교재 p.20~22",
        keywords: ["원자성", "일관성", "격리성", "영속성", "ACID", "NULL특징"],
        content: `
- **트랜잭션(Transaction)의 4대 특성 (ACID)**:
  1. **원자성(Atomicity)**: 트랜잭션 내 연산은 전부 실행되거나(All) 전부 취소되어야 함(Nothing).
  2. **일관성(Consistency)**: 트랜잭션 완료 후 DB는 언제나 모순 없는 유효한 상태를 유지해야 함.
  3. **격리성/고립성(Isolation)**: 실행 중인 트랜잭션의 중간 결과를 다른 트랜잭션이 참조할 수 없음.
  4. **영속성/지속성(Durability)**: 성공적으로 커밋된 결과는 시스템 장애가 발생해도 영구 보존됨.
- **NULL 속성의 핵심 원리**:
  - NULL은 **0이나 공백이 아니며, '알 수 없는 값(Unknown)'**이다.
  - **NULL과의 사칙연산 결과는 항상 NULL**이다. (100 + NULL = NULL)
  - 집계 함수(\`SUM\`, \`AVG\`, \`COUNT(컬럼명)\`)는 **NULL을 계산에서 자동 제외**한다!
  - 단, \`COUNT(*)\`는 NULL인 행도 전체 행 수에 포함하여 카운트한다.`,
        compareTable: null,
        targetSubject: "1과목"
      },
      {
        id: "m2-4",
        title: "4. 본질식별자 vs 인조식별자 (Surrogate Key)",
        page: "교재 p.23~24",
        keywords: ["본질식별자", "인조식별자", "대리키", "일련번호"],
        content: `
- **본질식별자 (Natural Key)**: 업무적으로 원래 존재하는 속성으로 구성된 식별자 (예: 주민번호, 사원번호, 계좌번호).
- **인조식별자 (Surrogate Key)**: 업무에는 없지만 복합키가 너무 길어지거나 관리가 불편하여 **인위적으로 순번/일련번호(Sequence)**를 부여한 식별자.
- **비교**:
  - 인조식별자를 쓰면 PK 컬럼 수가 단순해져 조인 쿼리 작성이 편해지고 성능이 좋아짐.
  - 단, 원래 업무적 중복을 방지하기 위해 본질식별자 컬럼들에 **UNIQUE 제약조건**을 별도로 걸어주어야 중복 데이터 삽입을 막을 수 있음!`,
        compareTable: null,
        targetSubject: "1과목"
      }
    ]
  },

  // ==========================================
  // [제2과목] 1장. SQL 기본 (p.25 ~ p.45)
  // ==========================================
  {
    subject: "2과목",
    subjectTitle: "제2과목: SQL 기본 및 활용",
    chapter: "1장",
    chapterTitle: "제1장. SQL 기본",
    sections: [
      {
        id: "s1-1",
        title: "1. SQL 명령어 분류 & SELECT 문 실행 순서 (★100% 출제)",
        page: "교재 p.28~31",
        keywords: ["DML", "DDL", "DCL", "TCL", "SELECT실행순서"],
        content: `
- **SELECT 문 실제 실행 순서 (★무조건 외우기)**:
  \`\`\`
  1. FROM        (대상 테이블 참조)
  2. ON / WHERE  (개별 행 필터링)
  3. GROUP BY    (그룹화 기준 집계)
  4. HAVING      (그룹화된 집계 결과 필터링)
  5. SELECT      (출력할 컬럼 선택 및 계산)
  6. ORDER BY    (최종 출력 결과 정렬)
  \`\`\`
  *(※ SELECT 절에서 선언한 별칭(Alias)은 6번 ORDER BY에서만 사용 가능! 2번 WHERE나 3번 GROUP BY에서는 사용 불가!)*`,
        compareTable: {
          headers: ["분류", "명령어", "특징 및 트랜잭션 커밋 여부"],
          rows: [
            ["DML (데이터 조작어)", "SELECT, INSERT, UPDATE, DELETE", "테이블 내 데이터 조작. 실행 후 COMMIT 필요 (Rollback 가능)"],
            ["DDL (데이터 정의어)", "CREATE, ALTER, DROP, TRUNCATE, RENAME", "테이블 구조 자체를 변경. **실행 즉시 Auto Commit (Rollback 불가!)**"],
            ["DCL (데이터 제어어)", "GRANT, REVOKE", "데이터베이스 사용자에게 권한을 부여하거나 회수"],
            ["TCL (트랜잭션 제어어)", "COMMIT, ROLLBACK, SAVEPOINT", "트랜잭션 작업 내용을 최종 확정하거나 취소"]
          ]
        },
        targetSubject: "2과목"
      },
      {
        id: "s1-2",
        title: "2. 단일행 함수 & NULL 관련 함수 총정리",
        page: "교재 p.34~38",
        keywords: ["문자함수", "숫자함수", "날짜함수", "NVL", "NVL2", "NULLIF", "COALESCE", "DECODE"],
        content: `
- **문자 함수**: \`LOWER\`, \`UPPER\`, \`SUBSTR(문자열, 시작, 길이)\`, \`LENGTH\`, \`LTRIM\`, \`RTRIM\`, \`TRIM\`, \`REPLACE\`, \`CONCAT\`
- **숫자 함수**: \`ROUND(반올림)\`, \`TRUNC(버림)\`, \`MOD(나머지)\`, \`CEIL(올림)\`, \`FLOOR(내림)\`
- **NULL 처리 함수 모음 (★초특급 빈출)**:
  - \`NVL(A, B)\`: A가 NULL이면 B 반환 (SQL Server: \`ISNULL(A, B)\`)
  - \`NVL2(A, B, C)\`: A가 **NULL이 아니면 B**, **NULL이면 C** 반환
  - \`NULLIF(A, B)\`: A와 B가 **같으면 NULL**, 다르면 A 반환
  - \`COALESCE(A, B, C, ...)\`: 인수 중 **첫 번째로 NULL이 아닌 값** 반환
  - \`DECODE(컬럼, 조건1, 결과1, 조건2, 결과2, ..., 기본값)\`: 오라클 전용 조건 분기문 (CASE WHEN과 동치)`,
        compareTable: null,
        targetSubject: "2과목"
      },
      {
        id: "s1-3",
        title: "3. WHERE 조건절 연산자 & 와일드카드",
        page: "교재 p.39~41",
        keywords: ["WHERE", "BETWEEN", "IN", "LIKE", "IS NULL", "와일드카드"],
        content: `
- **비교 연산자**: \`=\`, \`<>\`, \`!=\`, \`^\=\`, \`<\`, \`>\`, \`<=\`, \`>=\`
- **SQL 연산자**:
  - \`BETWEEN A AND B\`: A 이상 B 이하 (A와 B를 포함!)
  - \`IN (A, B, C)\`: A이거나 B이거나 C인 것 (OR 조건과 동일)
  - \`LIKE '패턴'\`:
    - \`%\`: 0개 이상의 모든 문자 (예: \`'김%'\` ➔ 김, 김밥, 김치찌개)
    - \`_\`: 정확히 1개의 임의의 문자 (예: \`'_L%'\` ➔ 두 번째 글자가 L인 모든 문자열)
  - \`IS NULL\` / \`IS NOT NULL\`: NULL 여부 확인 (주의: \`WHERE 컬럼 = NULL\`은 문법 오류는 안 나지만 무조건 거짓으로 판정되어 0건 반환!)
- **논리 연산자 우선순위**: **NOT ➔ AND ➔ OR** (AND가 OR보다 먼저 계산됨!)`,
        compareTable: null,
        targetSubject: "2과목"
      },
      {
        id: "s1-4",
        title: "4. 조인(JOIN) 완벽 정리 (INNER·OUTER·NATURAL·CROSS)",
        page: "교재 p.42~45",
        keywords: ["INNER JOIN", "LEFT OUTER JOIN", "RIGHT OUTER JOIN", "FULL OUTER JOIN", "NATURAL JOIN", "CROSS JOIN"],
        content: `
- **INNER JOIN**: 조인 조건에 일치하는 양쪽 모두 존재하는 행만 반환 (교집합).
- **OUTER JOIN**:
  - \`LEFT OUTER JOIN\`: 왼쪽 테이블의 모든 행은 무조건 보존, 매칭 안 되는 오른쪽 컬럼은 NULL로 채움.
  - \`RIGHT OUTER JOIN\`: 오른쪽 테이블의 모든 행 무조건 보존.
  - \`FULL OUTER JOIN\`: 양쪽 테이블 모두 보존 (합집합).
- **NATURAL JOIN (★함정 주의)**:
  - 두 테이블에서 이름과 도메인이 같은 모든 컬럼을 찾아 자동으로 EQUI JOIN.
  - **주의**: NATURAL JOIN에 사용된 컬럼은 \`SELECT A.ID\`처럼 **테이블 접두사나 별칭을 붙이면 문법 에러!**
- **CROSS JOIN**: 조인 조건이 없는 카티션 곱(Cartesian Product). (A 10행 × B 5행 = 50행 반환)`,
        compareTable: null,
        targetSubject: "2과목"
      }
    ]
  },

  // ==========================================
  // [제2과목] 2장. SQL 활용 (p.46 ~ p.85)
  // ==========================================
  {
    subject: "2과목",
    subjectTitle: "제2과목: SQL 기본 및 활용",
    chapter: "2장",
    chapterTitle: "제2장. SQL 활용",
    sections: [
      {
        id: "s2-1",
        title: "1. 서브쿼리(Subquery) 분류 (스칼라·인라인뷰·중첩)",
        page: "교재 p.48~55",
        keywords: ["스칼라서브쿼리", "인라인뷰", "중첩서브쿼리", "상관서브쿼리"],
        content: `
- **위치에 따른 분류**:
  1. **스칼라 서브쿼리 (Scalar Subquery)**: \`SELECT\` 절에 위치. **반드시 단 1개의 행과 1개의 컬럼만 반환**해야 함! (2건 이상 반환 시 오류 발생)
  2. **인라인 뷰 (Inline View)**: \`FROM\` 절에 위치한 서브쿼리. 마치 동적으로 생성된 가상 테이블처럼 동작. (별칭 지정 필수)
  3. **중첩 서브쿼리 (Nested Subquery)**: \`WHERE\` 절이나 \`HAVING\` 절에 위치한 서브쿼리.
- **동작 방식에 따른 분류**:
  - **비상관 서브쿼리**: 서브쿼리가 메인쿼리의 컬럼을 참조하지 않고 독자적으로 실행됨.
  - **상관(Correlated) 서브쿼리**: 메인쿼리의 한 행을 읽을 때마다 그 값을 서브쿼리에 전달하여 반복 실행됨.`,
        compareTable: null,
        targetSubject: "2과목"
      },
      {
        id: "s2-2",
        title: "2. 집합 연산자 (UNION·UNION ALL·INTERSECT·MINUS)",
        page: "교재 p.56~57",
        keywords: ["UNION", "UNION ALL", "INTERSECT", "MINUS", "집합연산자"],
        content: `
- 두 개 이상의 SELECT 문 결과를 하나로 결합할 때 사용 (컬럼 수와 데이터 타입이 상호 일치해야 함).`,
        compareTable: {
          headers: ["집합 연산자", "의미 및 수학적 집합", "중복 행 처리 및 정렬(Sort) 여부"],
          rows: [
            ["UNION", "합집합 (A ∪ B)", "중복된 행을 **제거**함. (내부적으로 Sort 연산 수행 ➔ 속도 상대적 느림)"],
            ["UNION ALL", "단순 합집합 (A + B)", "중복된 행을 **제거하지 않고 그대로 출력**. (정렬 연산 없음 ➔ 속도 가장 빠름)"],
            ["INTERSECT", "교집합 (A ∩ B)", "양쪽 쿼리에 공통으로 존재하는 행만 중복 제거 후 출력"],
            ["MINUS / EXCEPT", "차집합 (A - B)", "앞선 쿼리 결과에서 뒤쪽 쿼리 결과를 제외하고 남은 행 출력 (오라클: MINUS, SQL Server: EXCEPT)"]
          ]
        },
        targetSubject: "2과목"
      },
      {
        id: "s2-3",
        title: "3. 그룹 함수 확장: ROLLUP vs CUBE vs GROUPING SETS (★무조건 출제)",
        page: "교재 p.58~60",
        keywords: ["ROLLUP", "CUBE", "GROUPING SETS", "소계", "총계", "GROUPING"],
        content: `
- 컬럼 2개 \`GROUP BY 함수(A, B)\`를 적용했을 때 산출되는 집계 조합 비교:`,
        compareTable: {
          headers: ["함수", "생성되는 소계 및 총계 조합", "총 집계 레벨 수"],
          rows: [
            ["ROLLUP(A, B)", "(A, B) 상세 ➔ (A) 소계 ➔ () 전체합계", "N + 1 개 (계층적 / 인수의 순서에 따라 결과가 달라짐)"],
            ["CUBE(A, B)", "(A, B) 상세 ➔ (A) 소계 ➔ (B) 소계 ➔ () 전체합계", "2^N 개 (가능한 모든 조합 결합 / 인수의 순서 무관)"],
            ["GROUPING SETS(A, B)", "(A) 소계, (B) 소계만 각각 평면적으로 산출", "인수로 나열한 개별 그룹 집계만 각각 생성"]
          ]
        },
        targetSubject: "2과목"
      },
      {
        id: "s2-4",
        title: "4. 윈도우 함수 (순위 3총사·집계·순서 비율 함수)",
        page: "교재 p.61~65",
        keywords: ["RANK", "DENSE_RANK", "ROW_NUMBER", "LEAD", "LAG", "윈도우함수"],
        content: `
- **순위 함수 3총사 차이점 (동점자가 1등 2명일 때)**:
  - \`RANK()\`: 1등, 1등, **3등**, 4등 (중복 인원수만큼 순위를 건너뜀)
  - \`DENSE_RANK()\`: 1등, 1등, **2등**, 3등 (중복이 있어도 순위를 건너뛰지 않고 빽빽하게 이어감)
  - \`ROW_NUMBER()\`: 1등, 2등, 3등, 4등 (동점과 무관하게 1부터 고유한 순번 부여)
- **행 순서 관련 함수**:
  - \`LAG(컬럼, N)\`: 현재 행을 기준으로 **이전 N번째 행**의 값을 가져옴.
  - \`LEAD(컬럼, N)\`: 현재 행을 기준으로 **다음 N번째 행**의 값을 가져옴.
- **윈도우 범위 프레임 (Window Frame)**:
  - \`ROWS\`: 물리적인 행(Row)의 수를 기준으로 범위를 지정.
  - \`RANGE\`: 정렬된 컬럼의 실제 값(Value)의 범위를 기준으로 지정.`,
        compareTable: null,
        targetSubject: "2과목"
      },
      {
        id: "s2-5",
        title: "5. TOP-N 쿼리 & ROWNUM의 원리와 치명적 함정 (★시험 단골)",
        page: "교재 p.73~76",
        keywords: ["ROWNUM", "TOP-N", "인라인뷰정렬", "ROW_NUMBER"],
        content: `
- **ROWNUM의 부여 원리**:
  - ROWNUM은 데이터를 디스크에서 한 행씩 읽어올 때마다 **1부터 순차적으로 부여되는 가상 컬럼**이다.
- **치명적 함정 (★자주 나오는 오답)**:
  - \`WHERE ROWNUM > 1\` ➔ **결과가 0건 출력됨!** (에러는 안 남)
    - 이유: 첫 번째 행을 읽을 때 ROWNUM=1이 되는데, 조건 \`> 1\`을 만족하지 않아 탈락. 그 다음 행도 다시 ROWNUM=1로 평가되므로 결국 어떤 행도 통과하지 못함!
  - 따라서 ROWNUM 조건에는 **반드시 1이 포함되어야 함** (\`ROWNUM = 1\`, \`ROWNUM <= N\`).
- **ORDER BY와 ROWNUM의 순서 문제**:
  - \`WHERE ROWNUM <= 3 ORDER BY SAL DESC;\` ➔ **상위 3명이 아님!** 무작위 3명을 먼저 뽑은 뒤에 그 3명만 정렬함.
  - **올바른 상위 급여자 3명 추출법 (인라인 뷰 사용)**:
    \`\`\`sql
    SELECT *
    FROM (SELECT * FROM EMP ORDER BY SAL DESC)
    WHERE ROWNUM <= 3;
    \`\`\``,
        compareTable: null,
        targetSubject: "2과목"
      },
      {
        id: "s2-6",
        title: "6. 계층형 질의 (START WITH·CONNECT BY·PRIOR)",
        page: "교재 p.77~81",
        keywords: ["START WITH", "CONNECT BY", "PRIOR", "LEVEL", "ORDER SIBLINGS BY"],
        content: `
- **오라클 계층형 쿼리 기본 문법**:
  \`\`\`sql
  SELECT LEVEL, 사원명, 관리자번호
  FROM 사원
  START WITH 관리자번호 IS NULL       -- 최상위 루트 노드 지정
  CONNECT BY PRIOR 사원번호 = 관리자번호 -- 부모와 자식 연결 조건
  ORDER SIBLINGS BY 사원명 ASC;       -- 형제 노드끼리만 정렬
  \`\`\`
- **PRIOR 연산자 위치에 따른 방향 판별 (★핵심 킬러 문제)**:
  - \`CONNECT BY PRIOR 자식 = 부모\` ➔ **순방향 전개** (부모 ➔ 자식 방향, 위에서 아래로 트리 전개)
  - \`CONNECT BY 자식 = PRIOR 부모\` ➔ **순방향 전개** (PRIOR 뒤에 부모가 붙으면 무조건 순방향!)
  - \`CONNECT BY PRIOR 부모 = 자식\` ➔ **역방향 전개** (자식 ➔ 부모 방향, 아래에서 위로 거슬러 올라감)
- **가상 컬럼 및 함수**:
  - \`LEVEL\`: 루트 노드는 1, 그 하위는 2, 3... 단계별 깊이.
  - \`CONNECT_BY_ISLEAF\`: 최하위 리프 노드이면 1, 자식이 있으면 0.
  - \`CONNECT_BY_ROOT 컬럼\`: 현재 노드의 최상위 루트 노드 값을 반환.
  - \`SYS_CONNECT_BY_PATH(컬럼, 구분자)\`: 루트부터 현재 행까지의 경로 문자열 출력.`,
        compareTable: null,
        targetSubject: "2과목"
      },
      {
        id: "s2-7",
        title: "7. PIVOT 절과 UNPIVOT 절 & 정규표현식",
        page: "교재 p.82~85",
        keywords: ["PIVOT", "UNPIVOT", "REGEXP_LIKE", "REGEXP_SUBSTR"],
        content: `
- **PIVOT**: 행(Row) 데이터를 열(Column) 데이터로 회전하여 변환 (가로로 펼치기).
- **UNPIVOT**: 열(Column) 데이터를 행(Row) 데이터로 회전하여 변환 (세로로 내리기).
- **정규표현식 (2024 개정 강조 파트)**:
  - \`REGEXP_LIKE(문자열, 패턴)\`: 패턴과 일치하는지 여부 확인 (LIKE의 강력한 확장판).
  - \`REGEXP_SUBSTR(문자열, 패턴, 시작위치, 매칭순번)\`: 패턴과 일치하는 부분 문자열 추출.
  - \`REGEXP_REPLACE(문자열, 패턴, 대체문자)\`: 정규식 패턴을 찾아 다른 문자로 치환.
  - \`REGEXP_COUNT(문자열, 패턴)\`: 패턴과 일치하는 횟수 카운트.`,
        compareTable: null,
        targetSubject: "2과목"
      }
    ]
  },

  // ==========================================
  // [제2과목] 3장. 관리 구문 (p.86 ~ p.103)
  // ==========================================
  {
    subject: "2과목",
    subjectTitle: "제2과목: SQL 기본 및 활용",
    chapter: "3장",
    chapterTitle: "제3장. 관리 구문 (DML·TCL·DDL·DCL·객체)",
    sections: [
      {
        id: "s3-1",
        title: "1. DDL 제약조건 5가지 (PK·FK·UNIQUE·CHECK·NOT NULL)",
        page: "교재 p.86~90",
        keywords: ["PRIMARY KEY", "FOREIGN KEY", "UNIQUE", "CHECK", "NOT NULL", "CASCADE"],
        content: `
- **제약조건 5총사**:
  1. **PRIMARY KEY (기본키)**: 엔터티 내 행을 유일하게 식별. **(UNIQUE + NOT NULL)** 복합 적용.
  2. **FOREIGN KEY (외래키)**: 참조 무결성을 보장. 부모 테이블의 PK나 UNIQUE 컬럼을 참조.
  3. **UNIQUE**: 컬럼에 중복값을 허용하지 않음. **(단, NULL 값은 여러 개 입력 허용!)**
  4. **NOT NULL**: 해당 컬럼에 NULL 입력을 금지.
  5. **CHECK**: 입력 가능한 데이터의 값 범위나 조건 지정 (예: \`CHECK (AGE >= 0)\`).
- **외래키 삭제 옵션 (ON DELETE)**:
  - \`ON DELETE CASCADE\`: 부모 행이 삭제되면 이를 참조하던 자식 행도 **함께 연쇄 삭제**.
  - \`ON DELETE SET NULL\`: 부모 행이 삭제되면 자식의 외래키 값을 **NULL로 변경**.
  - \`RESTRICT / NO ACTION\`: 자식이 참조하고 있으면 부모 삭제 금지.`,
        compareTable: null,
        targetSubject: "2과목"
      },
      {
        id: "s3-2",
        title: "2. DCL 권한 제어 (GRANT·REVOKE·ROLE) & 오라클 기본 계정",
        page: "교재 p.94~97",
        keywords: ["GRANT", "REVOKE", "ROLE", "DCL", "SCOTT", "SYSTEM"],
        content: `
- **GRANT**: 권한을 사용자나 롤(Role)에게 부여.
  \`\`\`sql
  GRANT SELECT, INSERT ON EMP TO USER1 [WITH GRANT OPTION];
  \`\`\`
  - \`WITH GRANT OPTION\`: 부여받은 권한을 **다른 사용자에게 다시 재부여할 수 있는 권한**을 함께 줌.
- **REVOKE**: 부여했던 권한을 회수.
  \`\`\`sql
  REVOKE SELECT ON EMP FROM USER1 [CASCADE CONSTRAINTS];
  \`\`\`
  *(※ WITH GRANT OPTION으로 전파된 권한은 원래 권한자가 REVOKE하면 연쇄적으로 함께 취소됨!)*
- **ROLE(롤)**: 여러 개의 권한을 묶어놓은 권한의 집합 (예: CONNECT, RESOURCE, DBA).`,
        compareTable: null,
        targetSubject: "2과목"
      },
      {
        id: "s3-3",
        title: "3. 데이터베이스 기타 객체: 뷰(VIEW)·시퀀스(SEQUENCE)·시노님(SYNONYM)",
        page: "교재 p.98~103",
        keywords: ["VIEW", "SEQUENCE", "SYNONYM", "가상테이블"],
        content: `
- **뷰(VIEW)**:
  - 실제 데이터를 물리적으로 저장하지 않고, SELECT 쿼리 정의만을 저장하고 있는 **가상 테이블**.
  - 장점: 보안성(중요 컬럼 숨김), 독립성, 편리성(복잡한 조인 쿼리를 뷰 하나로 단순화).
- **시퀀스(SEQUENCE)**:
  - 고유한 일련번호를 자동으로 연속 생성해 주는 DB 객체. (주로 인조식별자 PK 생성용)
  - \`시퀀스명.NEXTVAL\`: 다음 번호 발급.
  - \`시퀀스명.CURRVAL\`: 현재 발급된 번호 확인.
- **시노님(SYNONYM)**:
  - 테이블, 뷰 등 데이터베이스 객체에 부여하는 **별칭(가명)**.
  - 긴 \`SCOTT.EMP\` 대신 \`EMP\`처럼 소유자명을 생략하고 단순하게 호출할 수 있게 해줌.`,
        compareTable: null,
        targetSubject: "2과목"
      }
    ]
  }
];
