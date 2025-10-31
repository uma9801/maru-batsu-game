dragElement(document.getElementById('item1'));
dragElement(document.getElementById('item2'));
dragElement(document.getElementById('item3'));
dragElement(document.getElementById('item4'));
dragElement(document.getElementById('item5'));
dragElement(document.getElementById('item6'));
dragElement(document.getElementById('item7'));
dragElement(document.getElementById('item8'));
dragElement(document.getElementById('item9'));
dragElement(document.getElementById('item10'));
dragElement(document.getElementById('item11'));
dragElement(document.getElementById('item12'));
dragElement(document.getElementById('item13'));
dragElement(document.getElementById('item14'));
dragElement(document.getElementById('item15'));
dragElement(document.getElementById('item16'));

function dragElement(marubatsuItem) {
    //set 4 positions for positioning on the screen
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    marubatsuItem.onpointerdown = pointerDrag;
    function pointerDrag(e) {
        e.preventDefault();
        console.log(e);
        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onpointermove = elementDrag;
        document.onpointerup = stopElementDrag;
    }

    function elementDrag(e) {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        marubatsuItem.style.top = (marubatsuItem.offsetTop - pos2) + "px";
        marubatsuItem.style.left = (marubatsuItem.offsetLeft - pos1) + "px";
    }

    function stopElementDrag() {
        document.onpointerup = null;
        document.onpointermove = null;
    }
}