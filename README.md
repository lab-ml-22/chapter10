<img width="800" height="600" alt="image" src="https://github.com/user-attachments/assets/511e9748-22ca-4b65-9df7-63f8253904d9" />
<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/>
  <br>
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>
</p>
<br>
<p align="center">
   <h1><strong>React랑 Typescript로 만든 인터렉티브 자기소개 서비스</strong>🏆</h1>

  <ul>
    <li><span>목표: 토너먼트 방식으로 결이 맞는 동료를 찾을 수 있는 인터렉티브 서비스</span></li>
    <li><span>기술스택: React19 + typescript, framerMotion, Vercel</li>
    <li><span>소개: 월드컵 토너먼트 형태로 구성된 인터랙티브 자기소개 서비스이며, 결이 맞는 동료가 될 수 있는지 확인해보세요.<span></li>
    <li><span>배포링크: https://chapter10.vercel.app/</span></li>
    <li>
      <span>주요기능</span>
      <ol>
        <li>토너먼트방식: 8강 -> 4강 -> 결승전 순서로 진행</li>
        <li>카드플립효과: 클릭시 카드 뒤집어지고 상세설명 확인</li>
        <li>반응형지원: pc,모바일 모두 지원</li>
        <li>애니메이션: framerMotion을 활용</li>
        <li>재시작기능: 언제든 처음부터 다시 시작가능(쿠키/세션없음), 브라우저새로고침 버튼으로 언제든 처음시작</li>
      </ol>
    </li>
  </ul>

  <h2>ISSUE</h2>
  <ul>
    <li>
      <span>2025-09-08(월)</span>
      <ol>
        <li>
          <span>typescript타입 충돌 이슈</span>
          <p>원인: match인터페이스랑 match컴포넌트 이름 충돌</p>
          <p>해결방법: 네이밍 컨벤션의 중요성</p>
        </li>
        <li>
          <span>React렌더링 중 상태 업데이트 이슈</span>
          <p>원인: TournamentBracket 렌더링 중 app컴포넌트 상태 업데이트</p>
          <p>해결방법: setTimeOut을 사용해서 렌더링 사이클 분리</p>
        </li>
        <li>
          <span>카드플립 애니메이션 구현 이슈</span>
          <p>원인: 카드선택과 플립기능의 이벤트충돌</p>
          <p>해결방법: 이벤트버블링 방지(카드선택만 실행, 카드플립만 실행)</p>
        </li>
        <li>
          <span>성능 최적화 이슈</span>
          <p>원인: 불필요한 리렌더링 발생(TournamentBracket.stx에서 initializeTournament함수가 매번 새로 생성되어서 발생 -> useEffect무한실행(=initializeTournament이게 변경될때마다 useEffect다시 실행) -> <br>
          사용자가 카드 선택할때마다 토너먼트가 첨부터 다시시작 -> 불필요한 계산으로 상태 업데이트 반복되는 성능 저하 발생</p>
          <p>해결방법: useCallback이랑 useMemo활용</p>
        </li>
      </ol>
    </li>
  </ul>
