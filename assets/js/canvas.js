// Canvas로 결과 이미지 생성 및 저장
async function generateResultImage(name1, name2, score, grade, emoji, desc, compatType) {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  // 배경 그라디언트
  const bgGrad = ctx.createLinearGradient(0, 0, 800, 800);
  bgGrad.addColorStop(0, '#FFF5F7');
  bgGrad.addColorStop(1, '#F8F0FF');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 800, 800);

  // 장식 원들
  ctx.save();
  ctx.globalAlpha = 0.08;
  const c1 = ctx.createRadialGradient(680, 120, 0, 680, 120, 300);
  c1.addColorStop(0, '#C77DFF');
  c1.addColorStop(1, 'transparent');
  ctx.fillStyle = c1;
  ctx.fillRect(0, 0, 800, 800);

  const c2 = ctx.createRadialGradient(120, 680, 0, 120, 680, 250);
  c2.addColorStop(0, '#FF6B9D');
  c2.addColorStop(1, 'transparent');
  ctx.fillStyle = c2;
  ctx.fillRect(0, 0, 800, 800);
  ctx.restore();

  // 상단 그라디언트 바
  const barGrad = ctx.createLinearGradient(0, 0, 800, 0);
  barGrad.addColorStop(0, '#FF6B9D');
  barGrad.addColorStop(0.5, '#C77DFF');
  barGrad.addColorStop(1, '#48CAE4');
  ctx.fillStyle = barGrad;
  roundRect(ctx, 40, 40, 720, 8, 4);
  ctx.fill();

  // 사이트명
  ctx.fillStyle = '#FF6B9D';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('name.dozard.com', 400, 100);

  // 궁합 타입
  ctx.fillStyle = '#C77DFF';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText(compatType, 400, 145);

  // 이름들
  ctx.fillStyle = '#2D2D2D';
  ctx.font = 'bold 52px sans-serif';
  ctx.fillText(`${name1}  ♥  ${name2}`, 400, 230);

  // 하트 배경
  ctx.save();
  const heartGrad = ctx.createLinearGradient(300, 280, 500, 480);
  heartGrad.addColorStop(0, '#FF6B9D');
  heartGrad.addColorStop(1, '#C77DFF');
  ctx.fillStyle = heartGrad;
  drawHeart(ctx, 400, 380, 120);
  ctx.fill();
  ctx.restore();

  // 점수
  ctx.fillStyle = 'white';
  ctx.font = 'bold 72px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${score}%`, 400, 405);

  // 이모지
  ctx.font = '60px sans-serif';
  ctx.fillText(emoji, 400, 510);

  // 등급
  const gradeGrad = ctx.createLinearGradient(200, 520, 600, 560);
  gradeGrad.addColorStop(0, '#FF6B9D');
  gradeGrad.addColorStop(1, '#C77DFF');
  ctx.fillStyle = gradeGrad;
  ctx.font = 'bold 42px sans-serif';
  ctx.fillText(grade, 400, 570);

  // 설명
  ctx.fillStyle = '#888';
  ctx.font = '22px sans-serif';
  const lines = wrapText(ctx, desc, 680, 22);
  lines.forEach((line, i) => {
    ctx.fillText(line, 400, 630 + i * 34);
  });

  // 하단 메시지
  ctx.fillStyle = '#FF6B9D';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('나도 해보기 👉 name.dozard.com', 400, 760);

  return canvas;
}

// 하트 경로 그리기
function drawHeart(ctx, x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.3);
  ctx.bezierCurveTo(x, y, x - size, y, x - size, y + size * 0.4);
  ctx.bezierCurveTo(x - size, y + size * 0.8, x, y + size * 1.1, x, y + size * 1.2);
  ctx.bezierCurveTo(x, y + size * 1.1, x + size, y + size * 0.8, x + size, y + size * 0.4);
  ctx.bezierCurveTo(x + size, y, x, y, x, y + size * 0.3);
  ctx.closePath();
}

// 둥근 사각형
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

// 텍스트 줄바꿈
function wrapText(ctx, text, maxWidth, fontSize) {
  const words = text.split(' ');
  const lines = [];
  let line = '';

  words.forEach(word => {
    const test = line + word + ' ';
    if (ctx.measureText(test).width > maxWidth && line !== '') {
      lines.push(line.trim());
      line = word + ' ';
    } else {
      line = test;
    }
  });
  if (line) lines.push(line.trim());
  return lines;
}

// 이미지 저장
async function saveResultImage(name1, name2, score, grade, emoji, desc, compatType) {
  const canvas = await generateResultImage(name1, name2, score, grade, emoji, desc, compatType);
  const link = document.createElement('a');
  link.download = `궁합_${name1}_${name2}_${score}%.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
