/* eslint-disable react/prop-types */
import { PureComponent } from 'react';
import jsPDF from 'jspdf';
import download from '/public/download.svg';

export default class Template extends PureComponent {
    
    constructor(props) {
        super(props);

        this.state = {
            name: props.generalData.firstName + " " + props.generalData.lastName,
            email: props.generalData.email || "no email",
            phone: props.generalData.phoneNumber || "no phone number",
            address: props.generalData.address || "no address",
            skills: props.generalData.skills || "",
            portfolio: props.generalData.portfolio || "Your portfolio here",
            linkedIn: props.generalData.linkedIn || "",
            education: props.educationData,
            experience: props.experienceData,
            projects: props.projectData
        }
    }

    jsPdfGenerator = () => {
        let doc = new jsPDF('p', 'pt');
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const leftColumnWidth = pageWidth * 0.35;
        const marginLeft = 20;
        const textMaxWidth = leftColumnWidth - 1 * marginLeft;
    
        const addPageIfNeeded = (yOffset) => {
            if (yOffset > pageHeight - 100) {
                doc.addPage();
                yOffset = 20;
            }
            return yOffset;
        };
    
        doc.setFillColor(230, 236, 245);
        doc.rect(0, 0, pageWidth, 80, 'F');
    
        doc.setFontSize(28);
        doc.setFont("helvetica", "bold");
        if(this.state.name != " ") {
            doc.text(this.state.name, pageWidth / 2, 50, { align: 'center' });
        } else {
            doc.text("Your Name Here.", pageWidth / 2, 50, { align: 'center' });
        }
    
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
    
        const segments = [];
    
        if (this.state.email) segments.push(this.state.email);
        if (this.state.phone) segments.push(this.state.phone);
        if (this.state.address) segments.push(this.state.address);
    
        const text = segments.join(' | ');
    
        if (text) {
            doc.text(text, pageWidth / 2, 70, { align: 'center' });
        }
    
        doc.setFillColor(240, 240, 240);
        doc.rect(0, 80, leftColumnWidth, pageHeight, 'F');
    
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("PROFILE", marginLeft, 110);
    
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        const profileText = [`${this.state.portfolio}`, `${this.state.linkedIn}`];
        let profileYStart = 130;
        let profileLineHeight = 15;
        let profileBlockHeight = profileText.length * profileLineHeight;
    
        profileYStart = addPageIfNeeded(profileYStart);
        doc.text(profileText, marginLeft, profileYStart, { maxWidth: textMaxWidth, lineHeightFactor: 1.5 });
    
        let contactYStart = profileYStart + profileBlockHeight + 40;
        contactYStart = addPageIfNeeded(contactYStart);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("SKILLS", marginLeft, contactYStart);
    
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        const contactInfoText = [
            `${this.state.skills}`,
        ];
        doc.text(contactInfoText, marginLeft, contactYStart + 20, { maxWidth: textMaxWidth, lineHeightFactor: 1.5 });
    
        let yOffset = 110;
    
        // Projects section
        if(this.state.projects[0].projectName) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text("PROJECTS", leftColumnWidth + marginLeft, yOffset);
            yOffset += 25;
            this.state.projects.forEach((pro) => {
                yOffset = addPageIfNeeded(yOffset);
    
                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.text(pro.projectName, leftColumnWidth + marginLeft, yOffset);
    
                doc.setFont("helvetica", "normal");
                doc.setFontSize(9);
                const goalText = pro.goal;
                const goalTextDimensions = doc.getTextDimensions(goalText, { maxWidth: pageWidth - leftColumnWidth - 2 * marginLeft });
    
                doc.text(goalText, leftColumnWidth + marginLeft, yOffset + 15, { maxWidth: pageWidth - leftColumnWidth - 2 * marginLeft });
    
                yOffset += goalTextDimensions.h + 20;
    
                doc.setFont("helvetica", "normal");
                doc.setFontSize(7);
                doc.text(pro.technologies, leftColumnWidth + marginLeft, yOffset, { maxWidth: pageWidth - leftColumnWidth - 2 * marginLeft });
    
                yOffset += 25;
            });
        } else {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text("PROJECTS", leftColumnWidth + marginLeft, yOffset);
            yOffset += 30;
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text(`${this.state.portfolio}`, leftColumnWidth + marginLeft, yOffset);
            yOffset += 10;
            doc.line(leftColumnWidth + marginLeft, yOffset, pageWidth - 20, yOffset);
            yOffset = addPageIfNeeded(yOffset);
        }

        doc.line(leftColumnWidth + marginLeft, yOffset, pageWidth - 20, yOffset);
    
        yOffset += 35;
        yOffset = addPageIfNeeded(yOffset);
    
        // Education section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("EDUCATION", leftColumnWidth + marginLeft, yOffset);
    
        if(this.state.education[0].school) {
            yOffset += 25;
            this.state.education.forEach((edu) => {
                yOffset = addPageIfNeeded(yOffset);
                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.text(edu.school, leftColumnWidth + marginLeft, yOffset);
                doc.setFont("helvetica", "normal");
                doc.setFontSize(9);
                doc.text(`${edu.fieldOfStudy} (${edu.dateStartStudy + " to " + edu.dateEndStudy})`, leftColumnWidth + marginLeft, yOffset + 15);
                doc.setFontSize(7);
                /* yOffset += 10;
                doc.text(`${edu.country}`) */
                yOffset += 40;
            });
    
            doc.line(leftColumnWidth + marginLeft, yOffset, pageWidth - 20, yOffset);
    
            yOffset += 35;
            yOffset = addPageIfNeeded(yOffset);
        } else {
            yOffset += 30;
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text("No education.", leftColumnWidth + marginLeft, yOffset);
    
            yOffset += 5;
    
            doc.line(leftColumnWidth + marginLeft, yOffset, pageWidth - 20, yOffset);
    
            yOffset += 35;
    
            yOffset = addPageIfNeeded(yOffset);
        }
    
        // Experience section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("EXPERIENCE", leftColumnWidth + marginLeft, yOffset);
    
        if (this.state.experience[0].positionTitle) {
            yOffset += 25;
            this.state.experience.forEach((exp) => {
                yOffset = addPageIfNeeded(yOffset);
    
                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.text(exp.positionTitle, leftColumnWidth + marginLeft, yOffset);
    
                doc.setFont("helvetica", "normal");
                doc.text(`${exp.companyName} (${exp.dateFrom + ' to ' + exp.dateTo})`, leftColumnWidth + marginLeft, yOffset + 15);
    
                doc.setFontSize(9);
                const descriptionText = exp.description;
                const descriptionTextDimensions = doc.getTextDimensions(descriptionText, { maxWidth: pageWidth - leftColumnWidth - 2 * marginLeft });
    
                doc.text(descriptionText, leftColumnWidth + marginLeft, yOffset + 30, { maxWidth: pageWidth - leftColumnWidth - 2 * marginLeft });
    
                yOffset += descriptionTextDimensions.h + 40;
            });
        } else {
            yOffset += 30;
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text("No experience.", leftColumnWidth + marginLeft, yOffset);
            yOffset += 10;
        }
    
        doc.line(leftColumnWidth + marginLeft, yOffset, pageWidth - 20, yOffset);
    
        doc.save("resume.pdf");
    }

    render() {
        return (
        <div className='mainTemplate'>
            <button onClick={this.jsPdfGenerator} className='downloadButton'>
                <img src={download} alt="" className='downloadSvg' />
                <p className='btnTextDownload'>Generate and download PDF</p>
            </button>
        </div>
        )
    }
}
