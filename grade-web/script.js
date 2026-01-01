function getGrade(topPercent) {
  if (topPercent <= 4) return 1;
  if (topPercent <= 11) return 2;
  if (topPercent <= 23) return 3;
  if (topPercent <= 40) return 4;
  if (topPercent <= 60) return 5;
  if (topPercent <= 77) return 6;
  if (topPercent <= 89) return 7;
  if (topPercent <= 96) return 8;
  return 9;
}

function calculate() {
  let grades = [];

  for (let i = 0; i < 6; i++) {
    let rank = Number(document.getElementById(`rank${i}`).value);
    let total = Number(document.getElementById(`total${i}`).value);

    if (!rank || !total || rank < 1 || rank > total) {
      alert("모든 값을 올바르게 입력하세요.");
      return;
    }

    let topPercent = (rank / total) * 100;
    let grade = getGrade(topPercent);
    grades.push(grade);

    document.getElementById(`result${i}`).innerText =
      `상위 ${topPercent.toFixed(1)}% → ${grade}등급`;
  }

  let avg = grades.reduce((a, b) => a + b) / grades.length;
  document.getElementById("average").innerText =
    `전체 평균 등급 : ${avg.toFixed(2)}등급`;
}
