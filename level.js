var Level = [
    {level: 1, experience: 10},
    {level: 2, experience: 20},
    {level: 3, experience: 40},
    {level: 4, experience: 80},
    {level: 5, experience: 160},
    {level: 6, experience: 320},
    {level: 7, experience: 640},
    {level: 8, experience: 1280},
    {level: 9, experience: 2500},
    {level: 10, experience: 5000},
    {level: 11, experience: 10000},
    {level: 12, experience: 20000},
    {level: 13, experience: 40000},
    {level: 14, experience: 80000},
    {level: 15, experience: 160000},
    {level: 16, experience: 320000}
]
var level_current
var exp
function getCurrentLevel(){
    level_current = localStorage.getItem("level")
    exp = localStorage.getItem("exp")
    if (level_current == null){
        localStorage.setItem("level", 1)
        localStorage.setItem("exp", 0)
        level_current = 1
        exp = 0
    }

    
}
function checkIfNeedLevelUp(){
    getCurrentLevel()
    if (Level[level_current-1].experience <= exp && level_current <= 15 ){
        level_current = parseInt(level_current) + 1
        localStorage.setItem("level", level_current)
    }
}
