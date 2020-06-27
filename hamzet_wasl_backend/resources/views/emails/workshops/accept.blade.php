@component('mail::message')
# Introduction
Thanks for joining our Workshop : {{$workshop->title}}

You have been accepted to join our workshop:
{{$workshop->title}}
<hr  width="30%">
our Workshop Description is :
<br>
    {{$workshop->description}}

start in {{$workshop->start_date}}
<br>
end  in  {{$workshop->end_date}}
<hr  width="30%">
meeting information :
<br>
meeting link :  {{$workshop->meeting_link}}

@if ($workshop->meeting_password !=null)
meeting password :  {{$workshop->meeting_password}}
@endif

@if ($workshop->meeting_backup_link !=null)
meeting backup link :  {{$workshop->meeting_backup_link}}
@endif

@if ($workshop->meeting_backup_password !=null)
meeting backup password :  {{$workshop->meeting_backup_password}}
@endif
<hr  width="30%">
Regards, 
Hamzet Wasl
@endcomponent
