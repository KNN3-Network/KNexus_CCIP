let timer1: any;

/**
 * @param target_top 
 */
export function resetScroll(target_top: number) {
  timer1 && clearInterval(timer1);
  var html = document.documentElement;
  setTimeout(() => {
    timer1 = animate(html.scrollTop, target_top, (val) => {
      html.scrollTop = val;
    })
  }, 1000);  
}
/**
 * @param start 
 * @param end 
 * @param callback 
 * @returns 
 */
function animate(start: number, end: number, callback: (s: number) => void) {
  var tick = 16;
  var total = 200;
  var times = Math.ceil(total / tick);
  var curTimes = 0;
  var dis = (end - start) / times;
  var timer = setInterval(() => {
    curTimes++;
    start += dis;
    if(curTimes === times) {
      start = end;
      clearInterval(timer);
    }
    callback(start);
  }, tick)
  return timer;
}