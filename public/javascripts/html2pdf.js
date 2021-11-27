window.onload = function(){
      document.getElementById("download")
      .addEventListener("click",()=>{
          const resume = this.document.getElementById("resume");
          var opt = {
              margin: 0.5,
              filename: 'resume.pdf',
              image: { type: 'jpeg', quality: 0.98},
              html2canvas: { scale: 2},
              jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait'}
          };
          html2pdf().from(resume).set(opt).save();
      })
}

