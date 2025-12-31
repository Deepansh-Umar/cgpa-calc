const gradeMap = [
    ["S",90],["A",80],["B",70],["C",60],["D",50],["E",40]
]
let predictMode = false

const courses = {
foundation: {
BSMA1001:{
name:"Mathematics for Data Science I",
inputs:["F","Qz1","Qz2"],
calc:v=>Math.max(
0.6*v.F+0.3*Math.max(v.Qz1,v.Qz2),
0.45*v.F+0.25*v.Qz1+0.3*v.Qz2
),
predict:(v,t)=>[
(t-(0.3*Math.max(v.Qz1,v.Qz2)))/0.6,
(t-(0.25*v.Qz1+0.3*v.Qz2))/0.45
]
},
BSHS1001:{
name:"English I",
inputs:["F","Qz1","Qz2"],
calc:v=>Math.max(
0.6*v.F+0.3*Math.max(v.Qz1,v.Qz2),
0.45*v.F+0.25*v.Qz1+0.3*v.Qz2
),
predict:(v,t)=>[
(t-(0.3*Math.max(v.Qz1,v.Qz2)))/0.6,
(t-(0.25*v.Qz1+0.3*v.Qz2))/0.45
]
},
BSCS1001:{
name:"Computational Thinking",
inputs:["F","Qz1","Qz2"],
calc:v=>Math.max(
0.6*v.F+0.3*Math.max(v.Qz1,v.Qz2),
0.45*v.F+0.25*v.Qz1+0.3*v.Qz2
),
predict:(v,t)=>[
(t-(0.3*Math.max(v.Qz1,v.Qz2)))/0.6,
(t-(0.25*v.Qz1+0.3*v.Qz2))/0.45
]
},
BSMA1002:{
name:"Statistics for Data Science I",
inputs:["F","Qz1","Qz2","Bonus"],
calc:v=>Math.max(
0.6*v.F+0.3*Math.max(v.Qz1,v.Qz2),
0.45*v.F+0.25*v.Qz1+0.3*v.Qz2
)+v.Bonus,
predict:(v,t)=>[
(t-v.Bonus-(0.3*Math.max(v.Qz1,v.Qz2)))/0.6,
(t-v.Bonus-(0.25*v.Qz1+0.3*v.Qz2))/0.45
]
},
BSMA1003:{
name:"Mathematics for Data Science II",
inputs:["F","Qz1","Qz2","Bonus"],
calc:v=>Math.max(
0.6*v.F+0.3*Math.max(v.Qz1,v.Qz2),
0.45*v.F+0.25*v.Qz1+0.3*v.Qz2
)+v.Bonus,
predict:(v,t)=>[
(t-v.Bonus-(0.3*Math.max(v.Qz1,v.Qz2)))/0.6,
(t-v.Bonus-(0.25*v.Qz1+0.3*v.Qz2))/0.45
]
},
BSHS1002:{
name:"English II",
inputs:["F","Qz1","Qz2"],
calc:v=>Math.max(
0.6*v.F+0.3*Math.max(v.Qz1,v.Qz2),
0.45*v.F+0.25*v.Qz1+0.3*v.Qz2
),
predict:(v,t)=>[
(t-(0.3*Math.max(v.Qz1,v.Qz2)))/0.6,
(t-(0.25*v.Qz1+0.3*v.Qz2))/0.45
]
},
BSCS1002:{
name:"Intro to Python Programming",
inputs:["F","Qz1","PE1","PE2"],
calc:v=>0.15*v.Qz1+0.4*v.F+0.25*Math.max(v.PE1,v.PE2)+0.2*Math.min(v.PE1,v.PE2),
predict:(v,t)=>[(t-(0.15*v.Qz1+0.25*Math.max(v.PE1,v.PE2)+0.2*Math.min(v.PE1,v.PE2)))/0.4]
},
BSMA1004:{
name:"Statistics for Data Science II",
inputs:["F","Qz1","Qz2","Bonus"],
calc:v=>Math.max(
0.6*v.F+0.3*Math.max(v.Qz1,v.Qz2),
0.45*v.F+0.25*v.Qz1+0.3*v.Qz2
)+v.Bonus,
predict:(v,t)=>[
(t-v.Bonus-(0.3*Math.max(v.Qz1,v.Qz2)))/0.6,
(t-v.Bonus-(0.25*v.Qz1+0.3*v.Qz2))/0.45
]
}
},

diploma: {
BSCS2004:{
name:"Machine Learning Foundations",
inputs:["F","Qz1","Qz2","GAA"],
calc:v=>0.05*v.GAA+Math.max(
0.6*v.F+0.25*Math.max(v.Qz1,v.Qz2),
0.4*v.F+0.25*v.Qz1+0.3*v.Qz2
),
predict:(v,t)=>[
(t-0.05*v.GAA-(0.25*Math.max(v.Qz1,v.Qz2)))/0.6,
(t-0.05*v.GAA-(0.25*v.Qz1+0.3*v.Qz2))/0.4
]
},
BSCS2007:{
name:"Machine Learning Techniques",
inputs:["F","Qz1","Qz2","GAA","Bonus"],
calc:v=>0.05*v.GAA+Math.max(
0.6*v.F+0.25*Math.max(v.Qz1,v.Qz2),
0.4*v.F+0.25*v.Qz1+0.3*v.Qz2
)+v.Bonus,
predict:(v,t)=>[
(t-v.Bonus-0.05*v.GAA-(0.25*Math.max(v.Qz1,v.Qz2)))/0.6,
(t-v.Bonus-0.05*v.GAA-(0.25*v.Qz1+0.3*v.Qz2))/0.4
]
},
BSCS2008:{
name:"Machine Learning Practice",
inputs:["F","OPPE1","OPPE2","KA","GAA"],
calc:v=>0.1*v.GAA+0.3*v.F+0.2*v.OPPE1+0.2*v.OPPE2+0.2*v.KA,
predict:(v,t)=>[(t-(0.1*v.GAA+0.2*v.OPPE1+0.2*v.OPPE2+0.2*v.KA))/0.3]
},
BSMS2001:{
name:"Business Data Management",
inputs:["F","Qz2","Timed"],
calc:v=>v.F+v.Qz2+v.Timed,
predict:(v,t)=>[(t-(v.Qz2+v.Timed))]
},
BSMS2002:{
name:"Business Analytics",
inputs:["F","Qz","A"],
calc:v=>v.F+v.Qz+v.A,
predict:(v,t)=>[(t-(v.Qz+v.A))]
},
BSSE2002:{
name:"Tools in Data Science",
inputs:["F","ROE","P1","P2","GAA"],
calc:v=>0.1*v.GAA+0.2*v.ROE+0.2*v.P1+0.2*v.P2+0.3*v.F,
predict:(v,t)=>[(t-(0.1*v.GAA+0.2*v.ROE+0.2*v.P1+0.2*v.P2))/0.3]
},
BSCS2002:{
name:"PDSA",
inputs:["F","Qz1","Qz2","OP","GAA"],
calc:v=>0.05*v.GAA+0.2*v.OP+0.45*v.F+Math.max(
0.2*Math.max(v.Qz1,v.Qz2),
0.1*v.Qz1+0.2*v.Qz2
),
predict:(v,t)=>[
(t-(0.05*v.GAA+0.2*v.OP+0.2*Math.max(v.Qz1,v.Qz2)))/0.45,
(t-(0.05*v.GAA+0.2*v.OP+(0.1*v.Qz1+0.2*v.Qz2)))/0.45
]
},
BSCS2001:{
name:"DBMS",
inputs:["F","Qz1","Qz2","OP","GAA2","GAA3"],
calc:v=>0.03*v.GAA2+0.02*v.GAA3+0.2*v.OP+0.45*v.F+Math.max(
0.2*Math.max(v.Qz1,v.Qz2),
0.1*v.Qz1+0.2*v.Qz2
),
predict:(v,t)=>[
(t-(0.03*v.GAA2+0.02*v.GAA3+0.2*v.OP+0.2*Math.max(v.Qz1,v.Qz2)))/0.45,
(t-(0.03*v.GAA2+0.02*v.GAA3+0.2*v.OP+(0.1*v.Qz1+0.2*v.Qz2)))/0.45
]
},
BSCS2003:{
name:"Application Development I",
inputs:["F","Qz1","Qz2","GLA"],
calc:v=>0.05*v.GLA+Math.max(
0.6*v.F+0.25*Math.max(v.Qz1,v.Qz2),
0.4*v.F+0.25*v.Qz1+0.3*v.Qz2
),
predict:(v,t)=>[
(t-0.05*v.GLA-(0.25*Math.max(v.Qz1,v.Qz2)))/0.6,
(t-0.05*v.GLA-(0.25*v.Qz1+0.3*v.Qz2))/0.4
]
},
BSCS2005:{
name:"Java",
inputs:["F","Qz1","Qz2","PE1","PE2","GAA"],
calc:v=>0.05*v.GAA+0.2*Math.max(v.PE1,v.PE2)+0.45*v.F+
Math.max(
0.2*Math.max(v.Qz1,v.Qz2),
0.1*v.Qz1+0.2*v.Qz2
)+0.1*Math.min(v.PE1,v.PE2),
predict:(v,t)=>[
(t-(0.05*v.GAA+0.2*Math.max(v.PE1,v.PE2)+0.1*Math.min(v.PE1,v.PE2)+0.2*Math.max(v.Qz1,v.Qz2)))/0.45,
(t-(0.05*v.GAA+0.2*Math.max(v.PE1,v.PE2)+0.1*Math.min(v.PE1,v.PE2)+(0.1*v.Qz1+0.2*v.Qz2)))/0.45
]
},
BSSE2001:{
name:"System Commands",
inputs:["F","Qz1","OPPE","BPTA","GAA"],
calc:v=>0.05*v.GAA+0.25*v.Qz1+0.3*v.OPPE+0.3*v.F+0.1*v.BPTA,
predict:(v,t)=>[(t-(0.05*v.GAA+0.25*v.Qz1+0.3*v.OPPE+0.1*v.BPTA))/0.3]
},
BSCS2006:{
name:"Application Development II",
inputs:["F","Qz1","Qz2","GAA"],
calc:v=>0.05*v.GAA+Math.max(
0.6*v.F+0.25*Math.max(v.Qz1,v.Qz2),
0.4*v.F+0.25*v.Qz1+0.3*v.Qz2
),
predict:(v,t)=>[
(t-0.05*v.GAA-(0.25*Math.max(v.Qz1,v.Qz2)))/0.6,
(t-0.05*v.GAA-(0.25*v.Qz1+0.3*v.Qz2))/0.4
]
},
BSDA2001:{
name:"Intro to Deep Learning and GenAI",
inputs:["F","Qz1","Qz2","NPPE1","NPPE2","GAA"],
calc:v=>0.1*v.GAA+0.2*v.Qz1+0.2*v.Qz2+0.25*v.F+0.1*v.NPPE1+0.15*v.NPPE2,
predict:(v,t)=>[(t-(0.1*v.GAA+0.2*v.Qz1+0.2*v.Qz2+0.1*v.NPPE1+0.15*v.NPPE2))/0.25]
}
}
}

function updateSubjects(){
subject.innerHTML=""
Object.entries(courses[level.value]).forEach(([k,v])=>{
const o=document.createElement("option")
o.value=k
o.text=v.name
subject.appendChild(o)
})
renderInputs()
}

function renderInputs() {
    inputs.innerHTML = ""
    const c = courses[level.value][subject.value]

    c.inputs.forEach(i=>{
        if(predictMode && i==="F") return
        const n = document.createElement("input")
        n.type = "number"
        n.id = i
        n.placeholder = i
        inputs.appendChild(n)
    })
}


function calculate(){
const c=courses[level.value][subject.value]
const v={}
c.inputs.forEach(i=>v[i]=Number(document.getElementById(i).value))
const t=c.calc(v)
output.innerText="Total: "+t.toFixed(2)+" | Grade: "+(gradeMap.find(g=>t>=g[1])?.[0]||"F")
}

function predict(){
const c=courses[level.value][subject.value]
const v={}
c.inputs.filter(i=>i!=="F").forEach(i=>v[i]=Number(document.getElementById(i).value))
let out=""
gradeMap.forEach(g=>{
const req=Math.min(...c.predict(v,g[1]))
out+=g[0]+": "+(req>100?"Not Possible":req<0?"Already Achieved":req.toFixed(2))+"\n"
})
output.innerText=out
}

updateSubjects()
