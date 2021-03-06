
const tipPercentageButtons = document.querySelectorAll('.tip-percent');
const customButton = document.querySelector('#custom');
const submitButton = document.querySelector('#submit');
const resetButton = document.querySelector('#reset');
const totalResult = document.querySelector('#totalResult');
const tipResult = document.querySelector('#tipResult');
const tipPerPerson = document.querySelector('#tipPerPerson');
const totalPerPerson = document.querySelector('#totalPerPerson');


let checked = document.querySelector('input[name="percent"]:checked');
const bill = document.querySelector('#billAmount');
let percentage = getPercentage();
const people = document.querySelector('#peopleAmount');


const billError = document.querySelector('#billError');
const peopleError = document.querySelector('#peopleError');

const billnanError = document.querySelector('#billnanError');
const peoplenanError = document.querySelector('#peoplenanError');

const percentError = document.querySelector('#percentError');

tipPercentageButtons.forEach(button => {
  button.addEventListener('click', hideCustom);
  button.addEventListener('click', activeEffect);
  if(button.innerText !== '15%') {
    button.addEventListener('click', uncheckDefault);
  }
})

customButton.addEventListener('click', e => {
  activeEffect(e);
  uncheckDefault();
  showCustom();
});

submitButton.addEventListener('click', displayResults);

resetButton.addEventListener('click', reset);


function displayResults() {

  const billAmount = Number(bill.value);
  percentage = getPercentage();
  const numPeople = Math.floor(Number(people.value));
  people.value = numPeople;

  if(billAmount > 0 && numPeople > 0) {
    if(confirmResults(billAmount, numPeople)) {
      clearErrors();
      const tip = billAmount * (percentage / 100);
      const totalWithTip = billAmount + tip;
      document.querySelector('#totalResult').innerText = ('$' + totalWithTip.toFixed(2));
      
      document.querySelector('#tipResult').innerText = ('$' + tip.toFixed(2));
  
      document.querySelector('#tipPerPerson').innerText = ('$' + (tip/numPeople).toFixed(2));
      
      document.querySelector('#totalPerPerson').innerText = ('$' + (totalWithTip/numPeople).toFixed(2));
    
    
    }

  } else {
    alert('Please enter a positive number first!');
  }
  
}


function getPercentage() {
  checked = document.querySelector('input[name="percent"]:checked');
  if(checked !== null) {
    let checkedValue = checked.id;
    
    let tipPercent;
    switch(checkedValue) {
      case 'five':
        tipPercent = 5;
        break;
      case 'ten':
        tipPercent = 10;
        break;
      case 'fifteen':
        tipPercent = 15;
        break;
      case 'twentyFive':
        tipPercent = 25;
        break;
      case 'fifty':
        tipPercent = 50;
        break;
      case 'custom':
        tipPercent = customPercent();
        break;
      default:
        break;
    }
    return tipPercent;
  }
  
}

function customPercent() {
  return Number(document.querySelector('#customInput').value);
}

function showCustom() {
  document.querySelector('.percentSymbol').classList.remove('removed');
  document.querySelector('#customInput').focus();
  document.querySelector('#buttonCustom').classList.add('removed');
}

function hideCustom() {
  document.querySelector('.percentSymbol').classList.add('removed');
  document.querySelector('#buttonCustom').classList.remove('removed');
}

function confirmResults(billInput, peopleInput) {
  let billEmpty = billInput === 0 ? true : false;
  let peopleEmpty = peopleInput === 0 ? true : false;
  console.log(billEmpty);
  console.log(peopleEmpty);
  

  let billnan = isNaN(billInput) 
  let peoplenan = isNaN(peopleInput);

  console.log(billnan);
  console.log(peoplenan);


  if(billEmpty && peoplenan) {
    billError.classList.remove('hidden');
    peoplenanError.classList.remove('hidden');
    bill.classList.add('emptyError');
    people.classList.add('emptyError');
    return false;
  } else if (billnan && peopleError) {
    billnanError.classList.remove('hidden');
    peopleError.classList.remove('hidden');
    bill.classList.add('emptyError');
    people.classList.add('emptyError');
    return false;
  }

  
  if(billEmpty && peopleEmpty) {
    billError.classList.remove('hidden');
    peopleError.classList.remove('hidden');
    bill.classList.add('emptyError');
    people.classList.add('emptyError');
    return false;
  } else if(billEmpty) {
    billError.classList.remove('hidden');
    bill.classList.add('emptyError');
    return false;
  } else if(peopleEmpty) {
    peopleError.classList.remove('hidden');
    people.classList.add('emptyError');
    return false;
  }

  if(billnan && peoplenan) {
    billnanError.classList.remove('hidden');
    peoplenanError.classList.remove('hidden');
    bill.classList.add('emptyError');
    people.classList.add('emptyError');
    return false;
  } else if(billnan) {
    billnanError.classList.remove('hidden');
    bill.classList.add('emptyError');
    return false;
  } else if(peoplenan) {
    peoplenanError.classList.remove('hidden');
    people.classList.add('emptyError');
    return false;
  }
  return true;
}

function clearErrors() {
  billError.classList.add('hidden');
  billnanError.classList.add('hidden');
  bill.classList.remove('emptyError')
  peopleError.classList.add('hidden');
  peoplenanError.classList.add('hidden');
  people.classList.remove('emptyError');
}

function uncheckDefault() {
  // checked.removeAttribute('checked');
  checked.checked = false;
}



function reset() {
  billAmount.value = '';
  peopleAmount.value = '';
  document.querySelector('#totalResult').innerText = '$0.00';
  document.querySelector('#tipResult').innerText = '$0.00';
  document.querySelector('#totalPerPerson').innerText = '$0.00';
  document.querySelector('#tipPerPerson').innerText = '$0.00';
  document.querySelector('#customInput').value = '';
  document.querySelector('#buttonCustom').classList.remove('buttonActive');
  hideCustom();
  removeEffects();
  clearErrors();
  document.querySelector('#buttonFifteen').classList.add('buttonActive');
  let defaultPercent = document.getElementById('fifteen');
  defaultPercent.checked = true;
}

function activeEffect(e) {
  removeEffects();
  e.target.classList.add('buttonActive');
}

function removeEffects() {
  let buttons = document.querySelectorAll('.button');
  buttons.forEach(element => {
    element.classList.remove('buttonActive');
  });
}
