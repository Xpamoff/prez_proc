$(".compile").on("click", ()=>{
    function pv_definer(pv, time){
        if(time == 1 || time == 2 || time == 3){
            if(pv>=15 && pv<=20){
                return 5.8;
            }
            else if(pv>20&&pv<50){
                return 5.7;
            }
            else{
                return 5.3;
            }
        }
        else{
            if(pv>15 && pv<=20){
                return 6;
            }
            else if(pv>20&&pv<50){
                return 5.9;
            }
            else{
                return 5.5;
            }
        }
    }
    function kv_definer(kv, time){
        if(kv==4){
            if(time == 1){
                return 2.1;
            }
            else if(time == 2){
                return 1.8;
            }
            else if(time == 3 || time == 4){
                return 1.1;
            }
            else{
                return 0.6;
            }
        }
        else if(kv==4.5){
            if(time == 1){
                return 2.4;
            }
            else if(time == 2){
                return 2.0;
            }
            else if(time == 3 || time == 4){
                return 1.3;
            }
            else{
                return 0.8;
            }
        }
        else if(kv==5){
            if(time == 1){
                return 2.7;
            }
            else if(time == 2){
                return 2.3;
            }
            else if(time == 3 || time == 4){
                return 1.4;
            }
            else{
                return 0.9;
            }
        }
        else if(kv==7){
            if(time == 1){
                return 3.9;
            }
            else if(time == 2){
                return 3.3;
            }
            else if(time == 3 || time == 4){
                return 2.1;
            }
            else{
                return 1.3;
            }
        }
        else if(kv==10){
            if(time == 1){
                return 5.7;
            }
            else if(time == 2){
                return 4.8;
            }
            else if(time == 3 || time == 4){
                return 3.1;
            }
            else{
                return 1.9;
            }
        }
        else return false;
    }
    function time_definer(time){
        if(time<=60){
            return 1;
        }
        else if(time>60&&time<=120){
            return 2;
        }
        else if(time>120&&time<=180){
            return 3;
        }
        else if(time==180){
            return 4;
        }
        else if(time>180&&time<=360){
            return 5;
        }
        else{
            return false;
        }
    }

    let pv = $("#pv").val();
    let kv = $("#kv").val();
    let time = $('#time').val();
    let sum = $('#sum').val();

    if(time<1||time>360){
        $('.result').html("Ошибка: Срок кредита не может быть меньше 1 мес. или больше 360 мес.");
        $('#time').css({'border' : '2px solid red', 'background-color' : 'rgb(255 200 200)'});
        return 0;
    }
    else{
        $('#time').css({'border' : '2px solid rgba(0, 106, 28, 0.27)', 'background-color' : 'white'});
    }
    if(pv<15||pv>100){
        $('.result').html("Ошибка: ПВ не может быть меньше 15% или больше 100%");
        $('#pv').css({'border' : '2px solid red', 'background-color' : 'rgb(255 200 200)'});
        return 0;
    }
    else{
        $('#pv').css({'border' : '2px solid rgba(0, 106, 28, 0.27)', 'background-color' : 'white'});
    }
    if(kv!=4&&kv!=4.5&&kv!=5&&kv!=7&&kv!=10){
        $('.result').html("Ошибка: КВ может принимать только значения: 4, 4.5, 5, 7, 10");
        $('#kv').css({'border' : '2px solid red', 'background-color' : 'rgb(255 200 200)'});
        return 0;
    }
    else{
        $('#kv').css({'border' : '2px solid rgba(0, 106, 28, 0.27)', 'background-color' : 'white'});
    }

    let time_of_credit = time;

    time = time_definer(time);
    pv = pv_definer(pv, time);
    kv = kv_definer(kv, time);


    let result = pv-kv;
    let mes = result/12/100;
    console.log(mes);
    let credit = sum*(mes/(1-(1+mes)**(-1*time_of_credit)));


    $('.result').html("Ставка: " + result.toFixed(2) + "% <br> Платёж: " + credit.toFixed(4) + " руб.");
})