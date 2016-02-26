$(document).ready(function () {
    
    
    
    /**
     * return operation type tools
     * @returns {boolean}
     * @author Mustafa Zeynel Dağlı
     * @since 10/02/2016
     */
    window.getOperationTypeTools = function () {
        
        /*try {
            writeMyFile(theData); //This may throw a error
          } catch(e) {  
            handleError(e); // If we got a error we handle it
          } finally {
            closeMyFile(); // always close the resource
          }*/

        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            data: { url:'pkFillConsultantOperationsToolsDropDown_sysOperationTypesTools' ,
                    language_code : 'tr',
                    main_group : 0,
                    pk : $("#pk").val()}, 
            type: 'GET',
            dataType: 'json',
            success: function (datas, textStatus, jqXHR) {
                if(datas.length!==0) {
                    $('#dropdownOperationsTools').ddslick('destroy');
                    $('#dropdownOperationsTools').ddslick({
                        data : datas,
                        width:'100%',
                        //selectText: "Select your preferred social network",
                        imagePosition:"right",

                    });
                    $('#dropdownOperationsToolsContainer').loadImager('removeLoadImage');
                } else {
                    console.error('"pkFillConsultantOperationsDropDown_sysOperationTypes" servis datası boştur!!');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
                console.error('"pkFillConsultantOperationsToolsDropDown_sysOperationTypes" servis hatası->'+textStatus);
            }
        });
    }
    
    /**
     * operation type tool select box filling for please select item
     * @author Mustafa Zeynel Dağlı
     * @since 11/02/2016
     */
    window.getOperationTypeToolsPleaseSelect = function() {
        var dropdownOperationsToolsData = [
            {
                text: "Lütfen Onay Aracı Seçiniz",
                value: -1,
                selected: true,
                description: "Operasyon tipi 'Onay' olarak seçilirse bu alan dolacaktır...",
                imageSrc: ""
            }
        ];
        
        $('#dropdownOperationsTools').ddslick({
            data : dropdownOperationsToolsData, 
            width:'100%',
            //selectText: "Select your preferred social network",
            imagePosition:"right",
            onSelected: function(selectedData){
                //console.log(selectedData.selectedData.text);
            }   
        });
        if($('#dropdownOperationsToolsContainer').loadImager()!='undefined') {
            $('#dropdownOperationsToolsContainer').loadImager('removeLoadImage');
        }
        
    }
    
    /**
     * machine property dialog test function
     * @author Mustafa Zeynel Dağlı
     * @todo this functionality will be implemented inside plugin after tests completed
     */
    window.testClick = function(e) {
        //alert('testclick');
        var invoker = e.target;
        var lastID = $(invoker).attr('data-last-id')
        console.log($(invoker).attr('data-last-id'));
        BootstrapDialog.show({
            data : { 
                'last-id' : lastID },
            title: 'Makina Özelliği Belirle',
            message: function(dialogRef){
                var $message = $('<div class="form-group">\n\
                                    <label>Operasyon Tipi</label>\n\
                                        <div class="input-group"> \n\
                                            <span class="input-group-addon"><i class="fa fa-tag"></i></span>\n\
                                            <div id="dropdownOperations"></div>\n\
                                        </div>\n\
                                 </div>\n\
                                <div class="form-group">\n\
                                    <label>Onay Aracı</label>\n\
                                        <div id="dropdownOperationsToolsContainer"  class="input-group">\n\
                                            <span class="input-group-addon"><i class="fa fa-tag"></i></span>\n\
                                            <div id="dropdownOperationsTools"></div>\n\
                                        </div>\n\
                                </div>');
                /*var $button = $('<button class="btn btn-primary btn-lg btn-block">Close the dialog</button>');
                $button.on('click', {dialogRef: dialogRef}, function(event){
                    event.data.dialogRef.close();
                });
                $message.append($button);*/

                return $message;
            },
            onshown: function(dialogRef){
                //var $invoker = $(e.relatedTarget);
                //dialogRef.data('trigger');
                //console.log(dialogRef.event.relatedTarget);
                window.getOperationTypeToolsPleaseSelect();
                 $.ajax({
                    url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                    data: { url:'pkFillConsultantOperationsDropDown_sysOperationTypes' ,
                            language_code : 'tr',
                            main_group : 2,
                            pk : $("#pk").val()}, 
                    type: 'GET',
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if(data.length!==0) {
                            $('#dropdownOperations').ddslick({
                                data : data, 
                                width:'100%',
                                //selectText: "Select your preferred social network",
                                imagePosition:"right",
                                onSelected: function(selectedData){
                                    //console.log(selectedData.selectedData.value);
                                    if(selectedData.selectedData.value==6) {
                                        $('#dropdownOperationsToolsContainer').loadImager();
                                        $('#dropdownOperationsToolsContainer').loadImager('appendImage');
                                        window.getOperationTypeTools();
                                    } else {
                                        $('#dropdownOperationsToolsContainer').loadImager();
                                        $('#dropdownOperationsToolsContainer').loadImager('appendImage');
                                        $('#dropdownOperationsTools').ddslick('destroy');
                                        window.getOperationTypeToolsPleaseSelect();
                                    }
                                }   
                            });
                        } else {
                            console.error('"pkFillConsultantOperationsDropDown_sysOperationTypes" servis datası boştur!!');
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {           
                        console.error('"pkFillConsultantOperationsDropDown_sysOperationTypes" servis hatası->'+textStatus);
                    }
                });
           
            },
            description: 'Makina Özelliği Belirleyiniz...',
            type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true, // <-- Default value is false
            draggable: true, // <-- Default value is false
            buttons: [ {
                icon: 'glyphicon glyphicon-ban-circle',
                label: 'Tamam',
                cssClass: 'btn-warning',
                action: function(dialogItself){
                    var id=dialogItself.getData('last-id');
                    //console.log(dialogItself.getModalBody());
                    var ddData = $('#dropdownOperations').data('ddslick');
                    console.log(ddData.selectedData.text);
                    console.log($('#label'+id).val(ddData.selectedData.text));
                    $('#label1').focus();
                    dialogItself.close();
                }
            }]
        });
       
    };
    
   /* var testTool = $(this).machineTree();
    testTool.machineTree({
        tested : function(event) {
            alert('tested worked');
        }
        
    });*/
    
    $('#form-builder-template').formBuilder();
    
    
    var tree = $('.tree2').machineTree();  
    tree.machineTree('option', 'url', 'pkFillMachineToolGroups_sysMachineToolGroups');
    tree.machineTree('option', 'pk', $("#pk").val());
    tree.machineTree('option', 'baseNodeCollapsedIcon','fa-hand-o-right');
    tree.machineTree('option', 'baseNodeExpandedIcon','fa-hand-o-down');
    tree.machineTree('setMainRoot');
    
    
    //testTool.machineTree('test');  
    
    
    /**
     * machine tool tree
     * @author Mustafa Zeynel Dağlı
     * @since 12/02/2016
     */
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > span').on('click', function (e) {
        //alert('test');
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            //$(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-cogs').removeClass('fa-spin');
        } else {
            children.show('fast');
            //$(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-spin').removeClass('fa-cogs');
        }
        e.stopPropagation();
    });
    
    

    /**
     * while widget todolist is being filled, loading image is displayed
     * @author Mustafa Zeynel Dağlı
     * @since 09/02/2016
     */
    $('#todolistboxcontainer').loadImager();
    //$('#todolistbox').loadImager('appendImage');
    
    /**
     * todo list box widget is being filled
     * @author Mustafa Zeynel Dağlı
     * @since 09/02/2016
     */
    var filler = $('#todolistbox').todolistFiller();

    /**
     * filling todo list widget with user confirmation statistics
     * @author Mustafa Zeynel Dağlı
     * @since 09/02/2016
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: { url:'pkGetConsWaitingForConfirm_blActivationReport' ,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
            $('#todolistboxcontainer').loadImager("removeLoadImage");
            filler.todolistFiller('option','domObjectKey','span[data-fill="true"]');
            filler.todolistFiller('option','otherDomObjectKeys','small[data-fill-number="true"],small[data-fill-number2="true"]');
            filler.todolistFiller('option','otherDomObjectKeysDataLabels',new Array('sure'));
            filler.todolistFiller('option','data',data);
            filler.todolistFiller('fill');
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
//            console.error(textStatus);
        }
    });
    
    /**
     * page contetnt header widgets are filled here (small colorfull boxes)
     * @author Mustafa Zeynel Dağlı
     * @since 11/02/2016
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: { url:'pkGetConsultantUpDashBoardCount_blActivationReport' ,
                pk : $("#pk").val()},
        type: 'GET',
        dataType: 'json',
        language_id:647,
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            $("#toplam_header_1_container").headerSetter(data[0]);
            $("#toplam_header_2_container").headerSetter(data[1]);
            $("#toplam_header_3_container").headerSetter(data[2]);
            $("#toplam_header_4_container").headerSetter(data[3]);
            //$('#todolistbox').loadImager("removeLoadImage");
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
//            console.error(textStatus);
        }

    });

    /**
     * cretaes half donut graghic for display
     * @author Mustafa Zeynel Dağlı
     * @since 10/02/2016
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: { url:'pkGetConsultantOperation_blActivationReport' ,
                pk : $("#pk").val()},
        type: 'GET',
        dataType: 'json',
        language_id:647,
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
//            console.warn(data);
            var dataArr = [];
            var catArr = [];
            $.each(data, function (index) {
                catArr.push(data[index].aciklama, parseFloat(data[index].adet));
                dataArr.push(catArr);
                catArr = [];
                //dataArr.push({y:parseInt(data[index].adet)});

            });

            //console.error(dataArr);
            // 3-d column bar
            $('#container_machinerByResource').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                title: {
                    text: 'Danışman Operasyonları',
                    align: 'center',
                    verticalAlign: 'top',
                    y: 50
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false,
                            distance: 20,
                            style: {
                                /*fontWeight: 'bold',*/
                                color: 'black',
                                //textShadow: '0px 1px 2px black'
                            }
                        },
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '85%'],
                        showInLegend: true
                    }
                },
                series: [{
                        type: 'pie',
                        name: 'Danışman İşlem Toplamları',
                        innerSize: '80%',
                        data: dataArr,
                        /*data: [
                         //dataArr
                         ['50 tona kadar',853],
                         ['50-100 Ton',  499],
                         ['100-150 Ton', 418],
                         ['150-200 Ton', 325],
                         ['200-250 Ton', 141],
                         ['250-300 Ton', 122],
                         ['300-350 Ton', 81],
                         ['350-400 Ton', 36],
                         ['400-450 Ton', 109],
                         ['500 Ton ve üstü', 310],
                         
                         ]*/
                    }]
            });
        }

    });

    /*
     * Author: Abdullah A Almsaeed
     * Date: 4 Jan 2014
     * Description:
     *      This is a demo file used only for the main dashboard (index.html)
     **/
    "use strict";

    $(function () {

        //Make the dashboard widgets sortable Using jquery UI
        $(".connectedSortable").sortable({
            placeholder: "sort-highlight",
            connectWith: ".connectedSortable",
            handle: ".box-header, .nav-tabs",
            forcePlaceholderSize: true,
            zIndex: 999999
        });
        $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css("cursor", "move");

        //jQuery UI sortable for the todo list
        $(".todo-list").sortable({
            placeholder: "sort-highlight",
            handle: ".handle",
            forcePlaceholderSize: true,
            zIndex: 999999
        });

        //bootstrap WYSIHTML5 - text editor
        $(".textarea").wysihtml5();

        $('.daterange').daterangepicker(
                {
                    ranges: {
                        'Today': [moment(), moment()],
                        'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                        'Last 7 Days': [moment().subtract('days', 6), moment()],
                        'Last 30 Days': [moment().subtract('days', 29), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                    },
                    startDate: moment().subtract('days', 29),
                    endDate: moment()
                },
        function (start, end) {
            alert("You chose: " + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        });

        /* jQueryKnob */
        $(".knob").knob();

        //jvectormap data
        var visitorsData = {
            "US": 398, //USA
            "SA": 400, //Saudi Arabia
            "CA": 1000, //Canada
            "DE": 500, //Germany
            "FR": 760, //France
            "CN": 300, //China
            "AU": 700, //Australia
            "BR": 600, //Brazil
            "IN": 800, //India
            "GB": 320, //Great Britain
            "RU": 3000 //Russia
        };
        //World map by jvectormap
        $('#world-map').vectorMap({
            map: 'world_mill_en',
            backgroundColor: "transparent",
            regionStyle: {
                initial: {
                    fill: '#e4e4e4',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 1
                }
            },
            series: {
                regions: [{
                        values: visitorsData,
                        scale: ["#92c1dc", "#ebf4f9"],
                        normalizeFunction: 'polynomial'
                    }]
            },
            onRegionLabelShow: function (e, el, code) {
                if (typeof visitorsData[code] != "undefined")
                    el.html(el.html() + ': ' + visitorsData[code] + ' new visitors');
            }
        });

        //Sparkline charts
        var myvalues = [1000, 1200, 920, 927, 931, 1027, 819, 930, 1021];
        $('#sparkline-1').sparkline(myvalues, {
            type: 'line',
            lineColor: '#92c1dc',
            fillColor: "#ebf4f9",
            height: '50',
            width: '80'
        });
        myvalues = [515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921];
        $('#sparkline-2').sparkline(myvalues, {
            type: 'line',
            lineColor: '#92c1dc',
            fillColor: "#ebf4f9",
            height: '50',
            width: '80'
        });
        myvalues = [15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21];
        $('#sparkline-3').sparkline(myvalues, {
            type: 'line',
            lineColor: '#92c1dc',
            fillColor: "#ebf4f9",
            height: '50',
            width: '80'
        });

        //The Calender
        $("#calendar").datepicker();

        //SLIMSCROLL FOR CHAT WIDGET
        $('#chat-box').slimScroll({
            height: '250px'
        });



        /* The todo list plugin */
        $(".todo-list").todolist({
            onCheck: function (ele) {
                console.log("The element has been checked")
            },
            onUncheck: function (ele) {
                console.log("The element has been unchecked")
            }
        });

    });


    // Left menuyu oluşturmak için çağırılan fonksiyon...
    $.fn.leftMenuFunction();
});