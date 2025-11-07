(function() {
    function bindDragToItem(item) {
        if (!item || item.__dragBound) return;
        item.__dragBound = true;

        // 古いハンドラを解除しておく（既存実装は onpointerdown を設定している）
        item.onpointerdown = null;

        let startX = 0, startY = 0, startLeft = 0, startTop = 0;

        function pointerDrag(e) {
            e.preventDefault();
            if (item.setPointerCapture) {
                try { item.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
            }

            startX = e.clientX;
            startY = e.clientY;
            const rect = item.getBoundingClientRect();
            const parent = item.offsetParent || document.body;
            const parentRect = parent.getBoundingClientRect();
            startLeft = rect.left - parentRect.left + window.scrollX;
            startTop  = rect.top  - parentRect.top  + window.scrollY;

            item.style.position = 'absolute';
            item.style.zIndex = '9999';

            document.onpointermove = function(eMove) {
                eMove.preventDefault();
                const dx = eMove.clientX - startX;
                const dy = eMove.clientY - startY;
                item.style.left = (startLeft + dx) + 'px';
                item.style.top  = (startTop  + dy) + 'px';
            };

            document.onpointerup = function(eUp) {
                if (item.releasePointerCapture) {
                    try { item.releasePointerCapture(eUp.pointerId); } catch (err) { /* ignore */ }
                }
                document.onpointermove = null;
                document.onpointerup = null;
                // optional: item.style.zIndex = '';
            };
        }

        item.addEventListener('pointerdown', pointerDrag, { passive: false });
    }

    function rebindAll() {
        // 対象セレクタ：既存の .item に加えて、.line-top, .line-left 等も含める
        // html側で明示的に data-draggable を付けた要素を対象とする方法もある（今回は採用していない）
        document.querySelectorAll('.item, .line-top, .line-end, .line-left, .line-right')
            .forEach(bindDragToItem);
    }

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', rebindAll);
    } else {
        rebindAll();
    }
})();
