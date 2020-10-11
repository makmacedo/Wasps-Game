export var test = function() {
    var nest_config = []
    fetch('config.json').then(r => r.json()).then(conf => nest_config = conf.wasps);

    var test_results = {
        tests: 0,
        pass: 0,
        fail: 0,
        assertions: 0,
        errors: []
    }



    /**
     * @test - check all elements are present
     * 
     */
    test_results.tests++
    let success = true

    document.getElementById('start').click()

    nest_config.forEach(wasp_config => {
        for (let i = 0; i < wasp_config.quantity; i++) { 
            let wasp_name = wasp_config.type === 'queen' ? 'queen' : `${wasp_config.type} ${i+ 1}`
            let wasp_element = document.getElementById(`${wasp_config.type}_${i+ 1}`)
            test_results.assertions++

            if (!wasp_element.innerText.toLowerCase().includes(wasp_name)) {
                success = false;
                test_results.errors.push(`failed to assert text ${wasp_name} was present in element ${wasp_element.innerHTML}`)
            }
        }
    })

    if (success) test_results.pass++
    else test_results.fail++



    /**
     * @test - check health points are displayed next to wasp name
     * 
     */
    test_results.tests++
    success = true

    nest_config.forEach(wasp_config => {
        for (let i = 0; i < wasp_config.quantity; i++) { 
            let wasp_element = document.getElementById(`${wasp_config.type}_${i+ 1}`)
            test_results.assertions++

            if (!wasp_element.innerText.includes(wasp_config.hp)) {
                success = false;
                test_results.errors.push(`failed to assert text ${wasp_config.hp} was present in element ${wasp_element.innerHTML}`)
            }
        }
    })

    if (success) test_results.pass++
    else test_results.fail++



    /**
     * @test - its possible to win a game with 12~87 attacks
     * 
     */
    success = false
    test_results.tests++
    test_results.assertions++
    
    document.getElementById('start').click()
    var total_wasps = document.querySelectorAll('.wasp').length
    var dead_wasps = document.querySelectorAll('.dead').length

    for (let i = 0, win = false; (!win) && (i < 87); i++) {
        if (dead_wasps == total_wasps && (12 < i < 87)) {
            win = true
            success = true
        } else {
            dead_wasps = document.querySelectorAll('.dead').length
            setTimeout(function timer() {
                document.getElementById('strike').click()
            }, i * 350);
        }
    }

    setTimeout(function timer() {
        if (document.getElementById('winner') != null) {
            success = true
        }
    }, 2000);

    if (success) {
        test_results.pass++
    } else {
        test_results.fail++
        test_results.errors.push(`failed to assert that is possible to win the game with 12~87 attacks...`)
    }



    console.log(test_results)
}