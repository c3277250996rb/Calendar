const timeline = document.getElementById("timeline");

const startHour = 8;
const endHour = 22;
const blockHeight = 120;  // 每小时 120px
const minutesPerBlock = 60;

const taskMap = {
    "09:00": "吃早餐",
    "10:00": "开会",
    "14:00": "写代码",
    "15:00": "咖啡时间",
    "17:00": "总结"
};

// 创建每小时时间块
for (let h = startHour; h <= endHour; h++) {
    const timeStr = `${String(h).padStart(2, '0')}:00`;
    const block = document.createElement("div");
    block.className = "time-block";
    block.id = `time-${h}-0`;
    block.dataset.time = timeStr;

    block.innerHTML = `<div class="time-label">${timeStr}</div>`;

    if (taskMap[timeStr]) {
        block.innerHTML += `<div class="task">${taskMap[timeStr]}</div>`;
    }

    timeline.appendChild(block);
}

// 添加红线
const nowLine = document.createElement("div");
nowLine.id = "now-line";
timeline.appendChild(nowLine);

function updateNowLineAndScroll() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = startHour * 60;
    const offsetMinutes = currentMinutes - startMinutes;

    if (offsetMinutes < 0 || offsetMinutes > (endHour - startHour + 1) * 60) return;

    // 每分钟 2px（120 / 60）
    const topPos = offsetMinutes * (blockHeight / minutesPerBlock);
    nowLine.style.top = `${topPos}px`;

    // 自动滚动到对应小时块（居中）
    const targetId = `time-${now.getHours()}-0`;
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

updateNowLineAndScroll();
setInterval(updateNowLineAndScroll, 60000); // 每分钟更新
