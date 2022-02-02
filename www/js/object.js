$(".compile").on("click", ()=>{

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
        else{
            return 4;
        }
    }

    function stavka_definer(pv, time, subs){
        if(pv<=20){
            if(subs - dt_pv1[time]<=0) return 0.1
            else return subs - dt_pv1[time];
        }
        else if(pv>20&&pv<=30){
            if(subs - dt_pv2[time]<=0) return 0.1
            else return subs - dt_pv2[time];
        }
        else if(pv>30&&pv<=50){
            if(subs - dt_pv3[time]<=0) return 0.1
            else return subs - dt_pv3[time];
        }
        else{
            if(subs - dt_pv4[time]<=0) return 0.1
            else return subs - dt_pv4[time];
        }
    }

    let pv = $("#pv").val();
    let time = $('#time').val();
    let sum = $('#sum').val();
    let child = $('input[name="child"]:checked').val()
    let kv = 10;


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



    let time_of_credit = time;

    time = time_definer(time);
    let subs;
    if(child == "podd"){
        subs = dt_podd;
    }
    else{
        subs = dt_child;
    }
    let result = stavka_definer(pv, time, subs);

    let mes = result/12/100;
    if(sum>0){
        let credit = sum*(mes/(1-(1+mes)**(-1*time_of_credit)));
        let obsh = credit*time_of_credit;
        let perep = obsh-sum;
        $('.result').html("Ставка: <span class='inner-result'>" + result.toFixed(2) + "%</span> <br> Платёж: <span class='inner-result'>" + credit.toFixed(2) + " руб.</span> <br> Общая сумма:  <span class='inner-result'>" + obsh.toFixed(2) + " руб.</span><br> Переплата:  <span class='inner-result'>" + perep.toFixed(2) + " руб.</span>");
    }
    else{
        $('.result').html("Ставка: <span class='inner-result'>" + result.toFixed(2) + "%</span>");
    }


})