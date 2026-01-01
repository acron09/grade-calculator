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

  // 1️⃣ 과목별 계산
  for (let i = 0; i < 6; i++) {
    const rank = Number(document.getElementById(`rank${i}`).value);
    const total = Number(document.getElementById(`total${i}`).value);
    const cell = document.getElementById(`result${i}`);

    if (!rank || !total || rank > total) {
      cell.innerText = "-";
      continue;
    }

    const percent = (rank / total) * 100;
    const grade = getGrade(percent);

    percents.push(percent);
    grades.push(grade);

    cell.innerText = `상위 ${percent.toFixed(1)}% / ${grade}등급`;
  }

  if (grades.length === 0) return;

  // 평균 등급
  const avg = grades.reduce((a, b) => a + b) / grades.length;

  let resultText = `평균 등급: ${avg.toFixed(2)}\n\n`;

  // 2️⃣ 영향도 분석
  let worstIndex = 0;
  let maxDiff = -Infinity;

  grades.forEach((g, i) => {
    const diff = g - avg;
    if (diff > maxDiff) {
      maxDiff = diff;
      worstIndex = i;
    }
  });

  resultText += `📉 평균을 가장 깎는 과목: ${subjects[worstIndex]}\n`;

  // 3️⃣ 안정성 분석
let unstableSubjects = [];

percents.forEach((p, i) => {
  for (let c of cutLines) {
    if (Math.abs(p - c) <= 2) {
      unstableSubjects.push(subjects[i]);
      break;
    }
  }
});

let stability;
if (unstableSubjects.length >= 3) stability = "⚠️ 위험";
else if (unstableSubjects.length === 2) stability = "△ 보통";
else stability = "◎ 안정";

resultText += `📊 안정성 평가: ${stability}\n`;

if (unstableSubjects.length > 0) {
  resultText += `⚠️ 불안정 과목: ${unstableSubjects.join(", ")}\n`;
} else {
  resultText += `⚠️ 불안정 과목: 없음\n`;
}


  let stability;
  if (unstableCount >= 3) stability = "⚠️ 위험";
  else if (unstableCount === 2) stability = "△ 보통";
  else stability = "◎ 안정";

  resultText += `📊 안정성 평가: ${stability} (불안정 과목 ${unstableCount}개)\n\n`;



  document.getElementById("average").innerText = resultText;
}

