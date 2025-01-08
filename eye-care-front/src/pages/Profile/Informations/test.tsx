{
	disorder.vision_disorder === "myopie" ? (
	) : null;
}


{disorder.vision_disorder === "daltonisme" ? (
                                        disorder.result >= 0 && disorder.result <= 2 ? (
                                            <div className="ocularIssueIndicator danger"></div>
                                        ) : disorder.result > 2 && disorder.result <= 4 ? (
                                            <div className="ocularIssueIndicator warning"></div>
                                        ) : disorder.result > 4 && disorder.result <= 7 ? (
                                            <div className="ocularIssueIndicator medium"></div>
                                        ) : disorder.result > 7 ? (
                                            <div className="ocularIssueIndicator good"></div>
                                        ) : null
                                    ) : null}