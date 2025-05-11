
const BASE_PRICE = 100;
const EDUCATION_COEFFICIENTS = {
    'bachelor': 1.5,
    'college': 1.2,
    'high_school': 1.05,
    'middle_school': 0.9
};
const NETWORTH_COEFFICIENTS = {
    'upper_class': 2,
    'middle_class': 1.5,
    'lower_class': 1.2
};
const CASTE_BONUSES = {
    'brahmin': 100,
    'kshatriya': 50,
    'vaishya': 20,
    'shudra': 10,
    'untouchable': -50
};
const SKILL_BONUSES = {
    'music': 10,
    'cooking': 20,
    'character': 15,
    'singing': 10
};
const AGE_COEFFICIENTS = {
    '18-23': 1.5,
    '24-27': 1.2,
    '28+': 0.95
};
const REPUTATION_COEFFICIENTS = {
    'parent_gossip': 0.85,
    'character_gossip': 0.9,
    'general_gossip': -20
};

function getSelectedValue(id) {
    return document.getElementById(id).value;
}
function isChecked(id) {
    return document.getElementById(id).checked;
}

function getSelectedRadio(name) {
    const radios = document.getElementsByName(name);
    for (let radio of radios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return null;
}

function calculatePrice() {
    let price = BASE_PRICE;

    const education = getSelectedValue('education');
    if (education !== 'blank') {
        price *= EDUCATION_COEFFICIENTS[education];
    }

    const networth = getSelectedValue('networth');
    if (networth !== 'blank') {
        price *= NETWORTH_COEFFICIENTS[networth];
    }
    

    const caste = getSelectedValue('caste');
    if (caste !== 'blank') {
        price += CASTE_BONUSES[caste];
    }
    
  
    for (let skill in SKILL_BONUSES) {
        if (isChecked(skill)) {
            price += SKILL_BONUSES[skill];
        }
    }

    const age = getSelectedRadio('age');
    if (age) {
        price *= AGE_COEFFICIENTS[age];
    }
    
 
    for (let rep in REPUTATION_COEFFICIENTS) {
        if (isChecked(rep)) {
            if (rep === 'general_gossip') {
                price += REPUTATION_COEFFICIENTS[rep];
            } else {
                price *= REPUTATION_COEFFICIENTS[rep];
            }
        }
    }
    
    return Math.round(price);
}

document.getElementById('submit').addEventListener('click', function() {
    const result = calculatePrice();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h3>Final Price: $${result}</h3>`;
    resultDiv.style.color = result > 0 ? 'green' : 'red';
}); 
