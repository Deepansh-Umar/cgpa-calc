const gps = ["NA",10,9,8,7,6,4,0]

function gpSelect() {
    const s = document.createElement("select")
    gps.forEach(g => {
        const o = document.createElement("option")
        o.value = g
        o.text = g
        s.appendChild(o)
    })
    return s
}

function row(name, credit) {
    const d = document.createElement("div")
    d.className = "subject"
    const l = document.createElement("span")
    l.innerText = name + " (" + credit + ")"
    d.appendChild(l)
    d.appendChild(gpSelect())
    return d
}

const foundationSubs = [
    ["Mathematics I",4],
    ["Statistics I",4],
    ["Computational Thinking",4],
    ["English I",4],
    ["Mathematics II",4],
    ["Statistics II",4],
    ["Python",4],
    ["English II",4]
]

const progSubs = [
    ["DBMS",4],
    ["DSA using Python",4],
    ["MAD I",4],
    ["MAD I Project",2],
    ["Java",4],
    ["MAD II",4],
    ["MAD II Project",2],
    ["System Commands",3]
]

const dsBase = [
    ["ML Foundations",4],
    ["Business Data Management",4],
    ["ML Techniques",4],
    ["ML Practice",4],
    ["ML Practice Project",2],
    ["Tools in DS",3]
]

const dsTracks = {
    ba: [
        ["Business Analytics",4],
        ["BDM Project",2]
    ],
    genai: [
        ["Intro to GenAI",4],
        ["GenAI Project",2]
    ]
}

function render(id, list) {
    const c = document.getElementById(id)
    c.innerHTML = ""
    list.forEach(s => c.appendChild(row(s[0], s[1])))
}

function calcRaw(id, list) {
    const sels = document.querySelectorAll("#"+id+" select")
    let points = 0
    let credits = 0

    sels.forEach((s,i)=>{
        if(s.value==="NA") return
        points += Number(s.value) * list[i][1]
        credits += list[i][1]
    })

    return credits === 0 ? null : { points, credits, cgpa: points / credits }
}

function calcFoundation() {
    const r = calcRaw("foundation", foundationSubs)
    document.getElementById("foundationResult").innerText =
        r ? "Foundation CGPA: " + r.cgpa.toFixed(2) : "Foundation CGPA: N/A"
    return r
}

function calcProg() {
    const f = calcFoundation()
    const p = calcRaw("prog", progSubs)

    let text = p ? "Diploma CGPA: " + p.cgpa.toFixed(2) : "Diploma CGPA: N/A"

    if(f && p) {
        const total = (f.points + p.points) / (f.credits + p.credits)
        text += "\nOverall CGPA (Foundation + Diploma): " + total.toFixed(2)
    }

    document.getElementById("progResult").innerText = text
}

function renderDS() {
    const track = document.getElementById("dsTrack").value
    render("ds", dsBase.concat(dsTracks[track]))
}

function calcDS() {
    const f = calcFoundation()
    const track = document.getElementById("dsTrack").value
    const d = calcRaw("ds", dsBase.concat(dsTracks[track]))

    let text = d ? "Diploma CGPA: " + d.cgpa.toFixed(2) : "Diploma CGPA: N/A"

    if(f && d) {
        const total = (f.points + d.points) / (f.credits + d.credits)
        text += "\nOverall CGPA (Foundation + Diploma): " + total.toFixed(2)
    }

    document.getElementById("dsResult").innerText = text
}

render("foundation", foundationSubs)
render("prog", progSubs)
renderDS()
