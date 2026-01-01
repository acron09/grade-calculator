function getGrade(percent) {
  if (percent <= 4) return 1;
  else if (percent <= 11) return 2;
  else if (percent <= 23) return 3;
  else if (percent <= 40) return 4;
  else if (percent <= 60) return 5;
  else if (percent <= 77) return 6;
  else if (percent <= 89) return 7;
  else if (percent <= 96) return 8;
  else return 9;
}

const cutLines = [4, 11, 23, 40, 60, 77, 89, 96, 100];
const subjects = ["국어", "영어", "수학", "사회", "과학", "역사"];

function calculate() {
  let grades = [];
  let percents = [];

  for (let i = 0; i < 6; i++) {
    const rankEl = document.getElementById(`rank${i}`);
    const totalEl = document.getElementById(`total${i}`);
    const resultEl = document.getElementById(`result${i}`);

    if (!rankEl || !totalEl || !resultEl) return;

    const rank = Number(rankEl.value);
    const total = Number(totalEl.value);

    if (!rank || !total || rank > total) {
      resultEl.innerText = "-";
      return;
    }

    const percent = (rank / total) * 100;
    const grade = getGrade(percent);

    grades.push(grade);
    percents.push(percent);

    resultEl.innerText = `상위 ${percent.toFixed(1)}% / ${grade}등급`;
  }

  const avg = grades.reduce((a, b) => a + b, 0) / grades.length;

  let text = `평균 등급: ${avg.toFixed(2)}\n\n`;

  // 영향도
  let worstIndex = 0;
  let maxDiff = -Infinity;

  grades.forEach((g, i) => {
    const diff = g - avg;
    if (diff > maxDiff) {
      maxDiff = diff;
      worstIndex = i;
    }
  });

  text += `📉 평균을 가장 깎는 과목: ${subjects[worstIndex]}\n`;

  // 안정성
  let unstable = [];

  percents.forEach((p, i) => {
    for (let c of cutLines) {
      if (Math.abs(p - c) <= 2) {
        unstable.push(subjects[i]);
        break;
      }
    }
  });

  let stability = "◎ 안정";
  if (unstable.length === 2) stability = "△ 보통";
  if (unstable.length >= 3) stability = "⚠️ 위험";

  text += `📊 안정성 평가: ${stability}\n`;
  text += `⚠️ 불안정 과목: ${unstable.length ? unstable.join(", ") : "없음"}`;

  document.getElementById("average").innerText = text;
}
