const STORAGE_KEY = 'citizen_incident_reports';

export const getCitizenReports = () => {
  try {
    const reports = localStorage.getItem(STORAGE_KEY);
    return reports ? JSON.parse(reports) : [];
  } catch (error) {
    console.error('Failed to load citizen reports:', error);
    return [];
  }
};

export const saveCitizenReport = (report) => {
  try {
    const existingReports = getCitizenReports();

    const newReport = {
      id: `citizen-${Date.now()}`,
      ...report,
      source: 'Citizen Report',
      status: 'Under Review',
      timestamp: new Date().toISOString(),
      aiConfidence: null,
    };

    const updatedReports = [newReport, ...existingReports];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedReports)
    );

    return newReport;
  } catch (error) {
    console.error('Failed to save citizen report:', error);
    return null;
  }
};

export const clearCitizenReports = () => {
  localStorage.removeItem(STORAGE_KEY);
};