function Contact() {
	return (
		<div className="h-[93vh]">
			<div className="mx-auto max-w-6xl px-4 ">
				<div className="mx-auto max-w-6xl py-10 md:py-20">
					<div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
						<img
							alt="Contact us"
							className="max-w-[35vw] rounded-xl"
							src="../../images/sumitzha.png"
						/>
						<div className="flex items-center justify-center">
							<div className="px-2 md:px-12">
								<p className="font-bold text-blue-500/60 md:text-[60px]">
									About Me
								</p>
								<p className="mt-4 text-md text-white py-3">
									I am a Full-stack devloper trying for make
									projects for fun and holding importance for
									the daily tasks.
									<ul className=" text-blue-200 ">
										<li>
											- Final year Btech student - CS
											Major
										</li>
										<li>- love doing problem solving</li>
										<li>
											- good with core CS (os, dbms,
											networking)
										</li>
										<li>- Make projects for fun</li>
										<li>
											- write code for cups of coffee{" "}
										</li>
									</ul>
									<br />
									This project is simply front-end, made for
									the purpose of quick drag, prioritizing the
									day and getting the things done rapidly
									without any huff and puffs
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Contact;
